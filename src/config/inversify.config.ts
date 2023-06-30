import { Container } from 'inversify';
import TYPES from '../constants/type';
import { BookController, BookService, IBookService } from '../components/book';
import {
  CategoryController,
  CategoryService,
  ICategoryService,
} from '../components/category';
import { CartController, CartService, ICartService } from '../components/cart';

const DiContainer = new Container();

DiContainer.bind<IBookService>(TYPES.IBookService)
  .to(BookService)
  .inRequestScope();
DiContainer.bind<ICategoryService>(TYPES.ICategoryService)
  .to(CategoryService)
  .inRequestScope();
DiContainer.bind<ICartService>(TYPES.ICartService)
  .to(CartService)
  .inRequestScope();

DiContainer.bind<BookController>(BookController).toSelf();
DiContainer.bind<CategoryController>(CategoryController).toSelf();

export default DiContainer;
