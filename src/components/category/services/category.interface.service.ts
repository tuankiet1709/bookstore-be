import { ICategory } from '../models/category.models';

export interface ICategoryService {
  get(): Promise<ICategory[]>;
}
