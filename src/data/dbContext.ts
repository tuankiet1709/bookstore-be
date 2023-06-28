import mongoose from 'mongoose';

import { CategoryModel } from '../components/category/models/category.models';
import { BookModel } from '../components/book/models/book.models';
import { seedCategories } from './seed/category_initial_data';
import { SeedData } from './seed/book_initial_data';

const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URL;

mongoose
	.connect(url)
	.then(() => console.log('Mongoose connection open'))
	.catch((err) => console.log(err));

const seedDB = async () => {
	await CategoryModel.deleteMany({});
	const category = await CategoryModel.insertMany(seedCategories);
	const bookData = await SeedData(category);
	await BookModel.deleteMany({});
	await BookModel.insertMany(bookData);
};

seedDB().then(() => {
	mongoose.connection.close();
});
