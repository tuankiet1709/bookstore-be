import { model, Schema, Model } from 'mongoose';
import { IBook } from '../../book';

export interface ICart {
  _id: string;
  product: IBook;
  quantity: number;
  user: string;
}

const CartSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'books', required: true },
  quantity: { type: Number, required: true },
  user: { type: String, required: true },
});

export const CartModel: Model<ICart> = model<ICart>('carts', CartSchema);
