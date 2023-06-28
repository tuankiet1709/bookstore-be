import { IBookService } from './book.interface.service';
import { BookModel, IBook } from '../models/book.models';
import { BookResponse } from '../../../constants/response';
import logger from '../../../utils/logger';
import { injectable } from 'inversify';
import BookQueryCriteria from '../models/book-query.dto';
import { IBookDto } from '../models/book.dto';
import { PagedResponseModel } from '../../../interfaces/PagedResponseModel';
import { CategoryModel } from '../../category/models/category.models';
import PageModel from '../../../interfaces/PagedModel';
import BookCreate from '../models/book-create.dto';

@injectable()
export class BookService implements IBookService {
	constructor() {}
	async get(): Promise<BookResponse> {
		try {
			const books = await BookModel.find();

			return books;
		} catch (err) {
			logger.error(`login: ${err}`);
			return Promise.reject({
				error: {
					type: 'internal_server_error',
					message: 'Internal Server Error',
				},
			});
		}
	}

	async getByPaging(
		bookQueryCriteria: BookQueryCriteria
	): Promise<PagedResponseModel<IBookDto>> {
		const query = {
			search: bookQueryCriteria.search ?? '',
			limit: bookQueryCriteria.limit ?? 12,
			page: bookQueryCriteria.page ?? 1,
			sortOrder: bookQueryCriteria.sortOrder ?? 1,
			sortColumn: bookQueryCriteria.sortColumn ?? '_id',
			_id: bookQueryCriteria._id,
			categoryID: bookQueryCriteria.categoryID,
		} as BookQueryCriteria;

		const bookFilter = await this.filter(query);
		const paged = await this.paging(query, bookFilter.match);

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
		});

		const PagedResponseModel: PagedResponseModel<IBookDto> = {
			status: 'success',
			totalItems: paged.TotalItems,
			totalPages: paged.TotalPages,
			currentPage: paged.CurrentPage,
			items: booksDto,
		};
		return PagedResponseModel;
	}

	async createBook(bookCreate: BookCreate): Promise<IBookDto> {
		try {
			const categoryRef = await CategoryModel.findById(
				bookCreate.category
			);
			if (categoryRef) {
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

			return bookDto;
		} catch (err) {
			logger.error(`login: ${err}`);

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
		const filter: any = {};
		if (typeof query.search != 'undefined' && query.search) {
			filter.title = { $regex: query.search, $options: 'i' };
		}
		if (query.categoryID) {
			const cate = await CategoryModel.findById(query.categoryID).exec();
			filter.category = cate._id;
		}
		if (query._id) {
			const book = await BookModel.findById(query._id).exec();
			filter._id = book._id;
		}
		const bookFilter = {
			match: { $match: filter },
			sort: { $sort: sort },
		};
		return bookFilter;
	}

	async paging(
		query: BookQueryCriteria,
		filter: any
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
