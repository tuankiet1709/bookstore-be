// type PagingType = (query: BookQueryCriteria) => Promise<IBook[]>

import BookQueryCriteria from '../models/book-query.dto';
import { PagedResponseModel } from '../../../interfaces/PagedResponseModel';
import { IBookDto } from '../models/book.dto';
import BookCreateUpdateDto from '../models/book-create.dto';
import { IBook } from '../models/book.models';

export interface IBookService {
  get(): Promise<IBook[]>;
  getById(id: string): Promise<IBook>;
  getByPaging(query: BookQueryCriteria): Promise<PagedResponseModel<IBookDto>>;
  createBook(bookCreateDto: BookCreateUpdateDto): Promise<IBookDto>;
  updateBook(
    id: string,
    bookUpdateDto: BookCreateUpdateDto,
  ): Promise<IBookDto | null>;
  deleteBook(id: string): Promise<IBook | null>;
}
