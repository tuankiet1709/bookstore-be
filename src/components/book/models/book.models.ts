import { ICategory } from '../../category/models/category.models';
import { model, Schema, Model, Document } from 'mongoose';

export interface IBook extends Document {
	_id: string;
	title: string;
	image: string;
	quantity: number;
	price: number;
	createdDate: Date;
	updatedDate: Date;
	description: string;
	author: string;
	category: ICategory;
	isDelete: boolean;
}

const BookSchema: Schema = new Schema({
	title: {
		type: String,
		maxLength: 30,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		min: 0,
		required: true,
	},
	price: {
		type: Number,
		min: 0,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	updatedDate: {
		type: Date,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'categories',
		required: true,
	},
	isDelete: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export const BookModel: Model<IBook> = model<IBook>('books', BookSchema);
