import bodyParser from 'body-parser';
import express, { RequestHandler } from 'express';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import { BookController } from './components/book/controllers/book.controller';
const path = require('path');
import DIContainer from './config/inversify.config';
import { UserController } from './components/user/controllers/user.controller';

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
		const bookController =
			DIContainer.resolve<BookController>(BookController);
		const userController =
			DIContainer.resolve<UserController>(UserController);

		this.express.get('/book', bookController.get.bind(bookController));
		this.express.get(
			'/book/paging',
			bookController.getPaging.bind(bookController)
		);
		this.express.post(
			'/book',
			bookController.createBook.bind(bookController)
		);
		this.express.get('/user', userController.login.bind(userController));

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
