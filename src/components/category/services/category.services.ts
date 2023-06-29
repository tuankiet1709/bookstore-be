import { injectable } from 'inversify';
import { ICategoryService } from './category.interface.service';
import { CategoryModel, ICategory } from '../models/category.models';
import logger from '../../../utils/logger';

@injectable()
export class CategoryService implements ICategoryService {
  constructor() {}
  async get(): Promise<ICategory[]> {
    try {
      const categories = await CategoryModel.find();

      return categories;
    } catch (err) {
      logger.error(`category: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }
}
