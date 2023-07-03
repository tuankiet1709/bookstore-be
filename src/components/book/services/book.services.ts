import { injectable } from 'inversify';
import { IBookService } from './book.interface.service';
import { BookModel, IBook } from '../models/book.models';
import logger from '../../../utils/logger';
import BookQueryCriteria from '../models/book-query.dto';
import { IBookDto } from '../models/book.dto';
import { CategoryModel } from '../../category';
import BookCreateUpdateDto from '../models/book-create.dto';
import { PagedResponseModel } from '../../../interfaces/PagedResponseModel';
import { PageModel } from '../../../interfaces/PagedModel';
import ApiError from '../../../middlewares/error-handling.middleware';

@injectable()
export class BookService implements IBookService {
  constructor() {}
  async get(): Promise<IBook[]> {
    try {
      const books = await BookModel.find();
      return books;
    } catch (err) {
      logger.error(`book: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async getById(id: string) {
    try {
      const book = await BookModel.findById(id).populate('category');
      if (!book) {
        throw new Error('Not found book');
      }
      return book;
    } catch (err) {
      logger.error(`book: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async getByPaging(
    bookQueryCriteria: BookQueryCriteria,
  ): Promise<PagedResponseModel<IBookDto>> {
    try {
      const bookFilter = await this.filter(bookQueryCriteria);
      const paged = await this.paging(bookQueryCriteria, bookFilter.match);
      const startRow = (await (paged.CurrentPage - 1)) * paged.PageSize;

      const books = await BookModel.aggregate([
        bookFilter.match,
        bookFilter.sort,
      ])
        .skip(startRow)
        .limit(paged.PageSize);

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
        totalItems: paged.TotalItems,
        totalPages: paged.TotalPages,
        currentPage: paged.CurrentPage,
        items: booksDto,
      };
      return PagedResponseModel;
    } catch (err) {
      logger.error(`GetBookByPaging: ${err}`);

      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async createBook(bookCreate: BookCreateUpdateDto): Promise<IBookDto> {
    try {
      const categoryRef = await CategoryModel.findById(bookCreate.category);
      if (!categoryRef) {
        throw new Error('there is no category found');
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
        ...book,
        id: book._id,
      };

      return bookDto;
    } catch (err) {
      logger.error(`CreateBook: ${err}`);

      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async updateBook(
    id: string,
    bookUpdateDto: BookCreateUpdateDto,
  ): Promise<IBookDto | null> {
    try {
      const currentBook: IBook | null = await BookModel.findById(id);
      if (!currentBook) {
        throw new ApiError(401, 'Not Found Book');
      }
      if (currentBook.category._id !== bookUpdateDto.category) {
        const categoryRef = await CategoryModel.findById(
          bookUpdateDto.category,
        );
        if (!categoryRef) {
          throw new Error('Not found category');
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
          ...updatedBook,
          id: updatedBook._id,
        };

        return bookDto;
      }

      return null;
    } catch (err) {
      logger.error(`UpdateBook: ${err}`);

      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async deleteBook(id: string): Promise<IBook | null> {
    try {
      const currentBook: IBook | null = await BookModel.findById(id);
      if (!currentBook) {
        throw new Error('Not found Book!');
      }

      const book = await BookModel.findByIdAndUpdate(id, {
        isDelete: true,
      });

      return book;
    } catch (err) {
      logger.error(`RemoveBook: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
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

    paged.CurrentPage = query.page < 0 ? 1 : query.page;
    paged.PageSize = query.limit || 12;

    paged.TotalItems = await BookModel.countDocuments({
      $and: [filter.$match],
    });

    paged.TotalPages = Math.ceil(paged.TotalItems / paged.PageSize);
    return paged;
  }
}
