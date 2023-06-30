import mongoose from 'mongoose';

import { CategoryModel } from '../components/category/models/category.models';
import { BookModel } from '../components/book/models/book.models';
import { seedCategories } from './seed/category_initial_data';
import { SeedData } from './seed/book_initial_data';
import logger from '../utils/logger';

const dotenv = require('dotenv');
dotenv.config();

const url: string = process.env.MONGO_URL ?? '';

mongoose
  .connect(url)
  .then(() => logger.info('Mongoose connection open'))
  .catch((err) => logger.error(err));

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
