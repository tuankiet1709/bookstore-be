import { ICategory } from '../../category/models/category.models';

export interface IBookDto {
	id: string;
	title: string;
	image: string;
	quantity: number;
	price: number;
	description: string;
	author: string;
	category: ICategory;
	isDelete: boolean;
}
