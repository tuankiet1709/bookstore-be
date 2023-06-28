// type PagingType = (query: BookQueryCriteria) => Promise<IBook[]>

import { BookResponse } from '../../../constants/response';
import BookQueryCriteria from '../models/book-query.dto';
import { PagedResponseModel } from '../../../interfaces/PagedResponseModel';
import { IBookDto } from '../models/book.dto';
import BookCreate from '../models/book-create.dto';

export interface IBookService {
	get(): Promise<BookResponse>;
	getByPaging(
		query: BookQueryCriteria
	): Promise<PagedResponseModel<IBookDto>>;
	createBook(bookCreate: BookCreate): Promise<IBookDto>;
}
