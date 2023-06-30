import express from 'express';
import { checkSchema } from 'express-validator';

import DIContainer from '../../../config/inversify.config';
import { BookController } from '../controllers/book.controller';
import { validatorMiddleware } from '../../../middlewares/validation.middleware';
import { bookPagingValidation } from '../validations/book-paging.validation';
import { bookGetByIdValidation } from '../validations/book-get-by-id.validation';
import { bookCreateValidation } from '../validations/book-create.validation';
import { bookUpdateValidation } from '../validations/book-update.validation';
import { bookDeleteValidation } from '../validations/book-delete.validation';

export const bookRoute = express.Router();

const bookController = DIContainer.resolve<BookController>(BookController);

bookRoute.get(
  '/book',
  checkSchema(bookPagingValidation),
  validatorMiddleware(),
  bookController.getPaging.bind(bookController),
);
bookRoute.get(
  '/book/:id',
  checkSchema(bookGetByIdValidation),
  validatorMiddleware(),
  bookController.getById.bind(bookController),
);
bookRoute.post(
  '/book',
  checkSchema(bookCreateValidation),
  validatorMiddleware(),
  bookController.createBook.bind(bookController),
);
bookRoute.put(
  '/book/:id',
  checkSchema(bookUpdateValidation),
  validatorMiddleware(),
  bookController.updateBook.bind(bookController),
);
bookRoute.delete(
  '/book/:id',
  checkSchema(bookDeleteValidation),
  validatorMiddleware(),
  bookController.deleteBook.bind(bookController),
);
