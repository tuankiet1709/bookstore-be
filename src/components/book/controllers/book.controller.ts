import { inject, injectable } from 'inversify';
import { IBookService } from '../services/book.interface.service';
import * as express from 'express';
import { IBook } from '../models/book.models';
import TYPES from '../../../constants/type';
import BookQueryCriteria from '../models/book-query.dto';
import BookCreate from '../models/book-create.dto';

@injectable()
export class BookController {
	private bookService: IBookService;

	constructor(@inject(TYPES.IBookService) bookService: IBookService) {
		this.bookService = bookService;
	}

	async get(req: express.Request, res: express.Response) {
		try {
			const resp = await this.bookService.get();

			res.status(200).json(resp);
		} catch (err) {
			res.status(500).json({
				error: {
					type: 'internal_server_error',
					message: 'Internal Server Error',
				},
			});
		}
	}

	async getPaging(req: express.Request, res: express.Response) {
		try {
			const query: BookQueryCriteria = req.query;
			// const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	res.status(503).send(errors); // Custom error
			// }

			const bookPaging = await this.bookService.getByPaging(query);

			res.status(200).json(bookPaging);
		} catch (err) {
			res.status(503).send(err);
		}
	}

	async createBook(req: express.Request, res: express.Response) {
		try {
			const bookParams: BookCreate = req.body;

			const newBook = await this.bookService.createBook(bookParams);

			res.status(200).json(newBook);
		} catch (err) {
			res.status(503).send(err);
		}
	}
}
