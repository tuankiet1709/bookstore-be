import { inject, injectable } from 'inversify';
import { IBookService } from '../services/book.interface.service';
import express, { NextFunction } from 'express';
import TYPES from '../../../constants/type';
import BookQueryCriteria from '../models/book-query.dto';
import BookCreateUpdateDto from '../models/book-create.dto';
import logger from '../../../utils/logger';

@injectable()
export class BookController {
  constructor(@inject(TYPES.IBookService) private bookService: IBookService) {}

  async get(req: express.Request, res: express.Response, next: NextFunction) {
    try {
      const book = await this.bookService.get();

      res.status(200).json(book);
    } catch (err) {
      logger.error(`get: ${err}`);
      next(err);
    }
  }

  async getById(
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      logger.info('Get book by Id');
      const resp = await this.bookService.getById(id);

      res.status(200).json(resp);
    } catch (err) {
      logger.error(`Get Book By Id: ${err}`);
      next(err);
    }
  }

  async getPaging(
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) {
    try {
      const { search, limit, page, sortOrder, sortColumn, categoryId } =
        req.query;

      const query: BookQueryCriteria = {
        search: search ?? '',
        limit: limit ? Number(limit) : 12,
        page: page ? Number(page) : 1,
        sortOrder: sortOrder ?? 1,
        sortColumn: sortColumn ?? '_id',
        categoryId: categoryId,
      } as BookQueryCriteria;

      logger.info('Get books by pagination');
      const bookPaging = await this.bookService.getByPaging(query);

      res.status(200).json(bookPaging);
    } catch (err) {
      logger.error(`Get Book By Paging: ${err}`);
      next(err);
    }
  }

  async createBook(
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) {
    try {
      const bookParams: BookCreateUpdateDto = req.body;

      logger.info('Create a new book');
      const newBook = await this.bookService.createBook(bookParams);

      res.status(200).json(newBook);
    } catch (err) {
      logger.error(`Create Book: ${err}`);
      next(err);
    }
  }

  async updateBook(
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const bookParams: BookCreateUpdateDto = req.body;

      logger.info('Update a new book');
      const updatedBook = await this.bookService.updateBook(id, bookParams);

      res.status(200).json(updatedBook);
    } catch (err) {
      logger.error(`Update book: ${err}`);
      next(err);
    }
  }

  async deleteBook(
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      logger.info('Remove a new book');
      await this.bookService.deleteBook(id);

      res.status(200).json({ message: 'Remove book successfully' });
    } catch (err) {
      logger.error(`Delete book: ${err}`);
      next(err);
    }
  }
}
