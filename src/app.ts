import bodyParser from 'body-parser';
import express, { RequestHandler } from 'express';
import { checkSchema } from 'express-validator';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yaml';
import fs from 'fs';
import cors from 'cors';

import DIContainer from './config/inversify.config';
import { validatorMiddleware } from './middlewares/validation.middleware';
import ApiError from './middlewares/error-handling.middleware';
import logger from './utils/logger';
import {
  BookController,
  bookCreateValidation,
  bookDeleteValidation,
  bookGetByIdValidation,
  bookPagingValidation,
  bookUpdateValidation,
} from './components/book';
import { CategoryController } from './components/category';

const path = require('path');
const file = fs.readFileSync('openapi.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json() as RequestHandler);
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());

    this.express.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        const error = err as ApiError;
        logger.error(error);
        res
          .status(error.statusCode ?? 500)
          .json(error.statusCode ?? 'Internal Server Error');
      },
    );

    // // morgan.token('body', (req: express.Request, res: express.Response) => JSON.stringify(req.body));
    // // this.express.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

    // /* istanbul ignore next */
    // if (config.morganLogger) {
    // 	this.express.use(
    // 		morgan(
    // 			':method :url :status :response-time ms - :res[content-length]'
    // 		)
    // 	);
    // }
    // /* istanbul ignore next */
    // if (config.morganBodyLogger) {
    // 	morganBody(this.express);
    // }
    // /* istanbul ignore next */
    // if (config.exmpleDevLogger) {
    // 	this.express.use(expressDevLogger);
    // }
    // this.express.use(
    // 	express.static(path.join(__dirname, '../../client/dist/client'))
    // );
  }

  private routes(): void {
    const bookController = DIContainer.resolve<BookController>(BookController);
    const categoryController =
      DIContainer.resolve<CategoryController>(CategoryController);

    this.express.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );

    this.express.get(
      '/category',
      categoryController.get.bind(categoryController),
    );
    //  this.express.get('/book', bookController.get.bind(bookController));
    this.express.get(
      '/book',
      checkSchema(bookPagingValidation),
      validatorMiddleware(),
      bookController.getPaging.bind(bookController),
    );
    this.express.get(
      '/book/:id',
      checkSchema(bookGetByIdValidation),
      validatorMiddleware(),
      bookController.getById.bind(bookController),
    );
    this.express.post(
      '/book',
      checkSchema(bookCreateValidation),
      validatorMiddleware(),
      bookController.createBook.bind(bookController),
    );
    this.express.put(
      '/book/:id',
      checkSchema(bookUpdateValidation),
      validatorMiddleware(),
      bookController.updateBook.bind(bookController),
    );
    this.express.delete(
      '/book/:id',
      checkSchema(bookDeleteValidation),
      validatorMiddleware(),
      bookController.deleteBook.bind(bookController),
    );

    // this.express.use("/api",[CategoryRoutes,bookRoute])
    // this.express.get('/', (req, res, next) => {
    // 	res.sendFile(
    // 		path.join(__dirname, '../../client/dist/client/index.html')
    // 	);
    // });
    this.express.use('*', (req, res, next) => {
      res.send('Make sure url is correctly!!!');
    });
  }
}

export default new App().express;
