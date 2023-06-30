import * as express from 'express';
import { CategoryController } from '../controllers/category.controllers';
import DIContainer from '../../../config/inversify.config';

const categoryController =
  DIContainer.resolve<CategoryController>(CategoryController);
export const categoryRoute = express.Router();

categoryRoute.get('/category', categoryController.get.bind(categoryController));
