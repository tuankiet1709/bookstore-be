import { injectable } from 'inversify';
import logger from '../../../utils/logger';
import { ICartService } from './cart.interface.service';
import { CartModel, ICart } from '../models/cart.models';
import { ICartCreateDto } from '../models/cart-create.model';
import { BookModel } from '../../book';
import ApiError from '../../../middlewares/error-handling.middleware';
import { ICartDto } from '../models/cartDto.model';

@injectable()
export class CartService implements ICartService {
  constructor() {}
  async get(email: string): Promise<ICartDto[]> {
    try {
      console.log(email);
      const cart: ICart[] = await CartModel.find({ user: email }).populate(
        'product',
        '_id title price image',
      );

      const cartDto: ICartDto[] = cart.map((cartItem) => {
        return {
          id: cartItem._id,
          productId: cartItem.product._id,
          productImage: cartItem.product.image,
          name: cartItem.product.title,
          price: cartItem.product.price,
          quantity: cartItem.quantity,
        };
      });

      return cartDto;
    } catch (err) {
      logger.error(`cart: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async addToCart(cartCreateDto: ICartCreateDto): Promise<any> {
    try {
      const productRef = await BookModel.findById(cartCreateDto.product);
      if (!productRef) {
        throw new ApiError(400, 'Not Found Book');
      }

      const newCart = {
        product: productRef,
        quantity: cartCreateDto.quantity,
        user: cartCreateDto.user,
      };

      return await CartModel.create(newCart);
    } catch (err) {
      logger.error(`Add to cart: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async updateQuantity(id: string, quantity: number): Promise<any> {
    try {
      console.log(id);
      return await CartModel.findByIdAndUpdate(id, {
        quantity: quantity,
      });
    } catch (err) {
      logger.error(`Add quantity: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async removeFromCart(id: string): Promise<any> {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (err) {
      logger.error(`Add quantity: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }
}
