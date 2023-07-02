import { Container } from 'inversify';
import TYPES from '../constants/type';
import { BookService, IBookService } from '../components/book';
import { CategoryService, ICategoryService } from '../components/category';
import { CartService, ICartService } from '../components/cart';

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

export default DiContainer;
