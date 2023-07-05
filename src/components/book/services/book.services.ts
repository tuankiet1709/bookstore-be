import { inject, injectable } from 'inversify';
import { IBookService } from './book.interface.service';
import { BookModel, IBook } from '../models/book.models';
import BookQueryCriteria from '../models/book-query.dto';
import { IBookDto } from '../models/book.dto';
import { CategoryModel } from '../../category';
import BookCreateUpdateDto from '../models/book-create.dto';
import { PagedResponseModel } from '../../../interfaces/PagedResponseModel';
import { PageModel } from '../../../interfaces/PagedModel';
import ApiError from '../../../middlewares/error-handling.middleware';
import TYPES from '../../../constants/type';
import { IKafkaService } from '../../kafka/services/kafka.interface.service';
import { ISchemaRegistryService } from '../../schema-registry/services/schema-registry.interface.service';
import { SchemaRegistry, readAVSC } from '@kafkajs/confluent-schema-registry';
import fs from 'fs';
import * as path from 'path';

const registry = new SchemaRegistry({
  host: 'http://localhost:8081',
});

@injectable()
export class BookService implements IBookService {
  constructor(
    @inject(TYPES.IKafkaService) private kafkaService: IKafkaService,
    @inject(TYPES.ISchemaRegistryService)
    private schemaRegistryService: ISchemaRegistryService,
  ) {
    this.kafkaService.connect();
  }
  async get(): Promise<IBook[]> {
    const books = await BookModel.find();
    return books;
  }

  async getById(id: string) {
    const book = await BookModel.findById(id).populate('category');
    if (!book) {
      throw new ApiError(404, 'Not found book');
    }
    return book;
  }

  async getByPaging(
    bookQueryCriteria: BookQueryCriteria,
  ): Promise<PagedResponseModel<IBookDto>> {
    const bookFilter = await this.filter(bookQueryCriteria);
    const paged = await this.paging(bookQueryCriteria, bookFilter.match);
    const startRow = (await (paged.currentPage - 1)) * paged.pageSize;

    const books = await BookModel.aggregate([bookFilter.match, bookFilter.sort])
      .skip(startRow)
      .limit(paged.pageSize);

    const bookByCategory = await BookModel.populate(books, {
      path: 'category',
    });

    const booksDto: IBookDto[] = bookByCategory.map((book) => {
      return {
        ...book,
        id: book._id,
      };
    });

    const PagedResponseModel: PagedResponseModel<IBookDto> = {
      status: 'success',
      totalItems: paged.totalItems,
      totalPages: paged.totalPages,
      currentPage: paged.currentPage,
      items: booksDto,
    };
    return PagedResponseModel;
  }

  async createBook(bookCreate: BookCreateUpdateDto): Promise<IBookDto> {
    const filePath = path.join(__dirname, '../avro/book-create.avsc');
    const schema = readAVSC(filePath);
    const registryId = await this.schemaRegistryService.getSchemaRegistryId(
      schema,
    );

    if (registryId) {
      const outgoingMessage = await registry.encode(registryId, bookCreate);
      this.kafkaService.productMessage('book-create', outgoingMessage);
    }

    const categoryRef = await CategoryModel.findById(bookCreate.category);
    if (!categoryRef) {
      throw new ApiError(404, 'Not found Category');
    }

    const newBook = {
      title: bookCreate.title,
      image: bookCreate.image,
      quantity: bookCreate.quantity,
      price: bookCreate.price,
      description: bookCreate.description,
      author: bookCreate.author,
      category: categoryRef,
    };

    const book = await BookModel.create(newBook);
    const bookDto: IBookDto = {
      id: book._id,
      title: book.title,
      image: book.image,
      quantity: book.quantity,
      price: book.price,
      description: book.description,
      author: book.author,
      category: book.category,
      isDelete: book.isDelete,
    };

    console.log(bookDto);

    return bookDto;
  }

  async updateBook(
    id: string,
    bookUpdateDto: BookCreateUpdateDto,
  ): Promise<IBookDto | null> {
    const filePath = path.join(__dirname, '../avro/book-create.avsc');
    const schema = readAVSC(filePath);
    const registryId = await this.schemaRegistryService.getSchemaRegistryId(
      schema,
    );

    if (registryId) {
      const outgoingMessage = await registry.encode(registryId, bookUpdateDto);
      this.kafkaService.productMessage('book-update', outgoingMessage);
    }

    const currentBook: IBook | null = await BookModel.findById(id);
    if (!currentBook) {
      throw new ApiError(404, 'Not Found Book');
    }
    if (currentBook.category._id !== bookUpdateDto.category) {
      const categoryRef = await CategoryModel.findById(bookUpdateDto.category);
      if (!categoryRef) {
        throw new ApiError(404, 'Not Found Category');
      } else {
        currentBook.category = categoryRef;
      }
    }

    currentBook.title = bookUpdateDto.title;
    currentBook.image = bookUpdateDto.image;
    currentBook.quantity = bookUpdateDto.quantity;
    currentBook.price = bookUpdateDto.price;
    currentBook.description = bookUpdateDto.description;
    currentBook.author = bookUpdateDto.author;

    const updatedBook = await BookModel.findByIdAndUpdate(id, currentBook);
    if (updatedBook) {
      const bookDto: IBookDto = {
        id: updatedBook._id,
        title: updatedBook.title,
        image: updatedBook.image,
        quantity: updatedBook.quantity,
        price: updatedBook.price,
        description: updatedBook.description,
        author: updatedBook.author,
        category: updatedBook.category,
        isDelete: updatedBook.isDelete,
      };

      return bookDto;
    }

    return null;
  }

  async deleteBook(id: string): Promise<IBook | null> {
    const filePath = path.join(__dirname, '../avro/book-delete.avsc');
    const schema = readAVSC(filePath);
    const registryId = await this.schemaRegistryService.getSchemaRegistryId(
      schema,
    );

    if (registryId) {
      const outgoingMessage = await registry.encode(registryId, { id });
      this.kafkaService.productMessage('book-delete', outgoingMessage);
    }
    const currentBook: IBook | null = await BookModel.findById(id);
    if (!currentBook) {
      throw new ApiError(401, 'Not found Book');
    }

    const book = await BookModel.findByIdAndUpdate(id, {
      isDelete: true,
    });

    return book;
  }

  async filter(query: BookQueryCriteria): Promise<any> {
    const sort: any = {
      [query.sortColumn]: query.sortOrder,
    };
    const filter: any = {
      isDelete: false,
    };
    if (typeof query.search != 'undefined' && query.search) {
      filter.title = { $regex: query.search, $options: 'i' };
    }
    if (query.categoryId) {
      const cate = await CategoryModel.findById(query.categoryId);
      if (cate) {
        filter.category = cate._id;
      }
    }
    const bookFilter = {
      match: { $match: filter },
      sort: { $sort: sort },
    };
    return bookFilter;
  }

  async paging(
    query: BookQueryCriteria,
    filter: any,
  ): Promise<PageModel<IBook>> {
    const paged = {} as PageModel<IBook>;

    paged.currentPage = query.page < 0 ? 1 : query.page;
    paged.pageSize = query.limit || 12;

    paged.totalItems = await BookModel.countDocuments({
      $and: [filter.$match],
    });

    paged.totalPages = Math.ceil(paged.totalItems / paged.pageSize);
    return paged;
  }
}
