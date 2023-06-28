import { ICategory } from './../components/category/models/category.models';
import { IBook } from './../components/book/models/book.models';

export type ErrorResponse = { error: { type: string; message: string } };
export type AuthResponse = ErrorResponse | { userId: string };
export type CreateUserResponse = ErrorResponse | { userId: string };
export type LoginUserResponse =
	| ErrorResponse
	| { token: string; userId: string; expireAt: Date };
export type CategoryResponse = ErrorResponse | { categories: ICategory[] };
export type BookResponse = ErrorResponse | IBook[];
