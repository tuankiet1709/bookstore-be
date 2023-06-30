import { model, Schema, Model } from 'mongoose';

export interface ICategory {
  _id: string;
  name: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const CategoryModel: Model<ICategory> = model<ICategory>(
  'categories',
  CategorySchema,
);
