import { Container } from 'inversify';
import { BookController } from '../components/book/controllers/book.controller';
import { IBookService } from '../components/book/services/book.interface.service';
import TYPES from '../constants/type';
import { BookService } from '../components/book/services/book.services';
import { UserService } from '../components/user/services/user.services';
import { IUserService } from '../components/user/services/user.service.interface';
import { UserController } from '../components/user/controllers/user.controller';

const DiContainer = new Container();

DiContainer.bind<IBookService>(TYPES.IBookService)
	.to(BookService)
	.inRequestScope();
DiContainer.bind<IUserService>(TYPES.IUserService)
	.to(UserService)
	.inRequestScope();

DiContainer.bind<BookController>(BookController).toSelf();
DiContainer.bind<UserController>(UserController).toSelf();

export default DiContainer;
