import express, { RequestHandler } from 'express';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import cors from 'cors';

import ApiError from './middlewares/error-handling.middleware';
import logger from './utils/logger';
import { categoryRoute } from './components/category/route/category.route';
import { bookRoute } from './components/book/route/book.routes';
import { cartRoute } from './components/cart/route/cart.routes';

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
    this.express.use(express.json() as RequestHandler);
    this.express.use(express.urlencoded({ extended: false }));
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

    this.express.use(
      morgan(':method :url :status :response-time ms - :res[content-length]'),
    );
  }

  private routes(): void {
    this.express.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
    this.express.use('', [categoryRoute, bookRoute, cartRoute]);
    this.express.use((req, res, next) => {
      res.send('Make sure url is correctly!!!');
    });
  }
}

export default new App().express;
