import { inject, injectable } from 'inversify';
import { ICategoryService } from '../services/category.interface.service';
import TYPES from '../../../constants/type';
import express, { NextFunction } from 'express';
import logger from '../../../utils/logger';
import { ICategory } from '../models/category.models';

@injectable()
export class CategoryController {
  constructor(
    @inject(TYPES.ICategoryService) private categoryService: ICategoryService,
  ) {}

  public async get(
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) {
    try {
      const categories: ICategory[] = await this.categoryService.get();

      logger.info('Get Category');
      res.status(200).json(categories);
    } catch (err) {
      logger.error(`get categories: ${err}`);
      next(err);
    }
  }
}
