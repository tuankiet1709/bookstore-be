import { ICartCreateDto } from '../models/cart-create.model';
import { ICartDto } from '../models/cartDto.model';

export interface ICartService {
  get(email: string): Promise<ICartDto[]>;
  addToCart(cartCreateDto: ICartCreateDto): Promise<any>;
  updateQuantity(id: string, quantity: number): Promise<any>;
  removeFromCart(id: string): Promise<any>;
}
