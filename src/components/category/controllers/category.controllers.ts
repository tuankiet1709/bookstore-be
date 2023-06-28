import { inject, injectable } from 'inversify';
import { ICategoryService } from '../services/category.interface.service';
import TYPES from '../../../constants/type';
import express from 'express';
import logger from '../../../utils/logger';
import ApiError from '../../../middlewares/error-handling.middleware';

@injectable()
export class CategoryController {
  private categoryService: ICategoryService;

  constructor(
    @inject(TYPES.ICategoryService) categoryService: ICategoryService,
  ) {
    this.categoryService = categoryService;
  }

  public async get(req: express.Request, res: express.Response) {
    try {
      const categories = await this.categoryService.get();

      res.status(200).json(categories);
    } catch (err) {
      logger.error(`get categories: ${err}`);
      throw new ApiError(500, 'Internal Server Error');
    }
  }
}
