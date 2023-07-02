import { inject, injectable } from 'inversify';
import logger from '../../../utils/logger';
import { ICartService } from './cart.interface.service';
import { CartModel, ICart } from '../models/cart.models';
import { ICartCreateDto } from '../models/cart-create.model';
import { BookModel, IBookService } from '../../book';
import ApiError from '../../../middlewares/error-handling.middleware';
import { ICartDto } from '../models/cartDto.model';
import TYPES from '../../../constants/type';
import BookCreateUpdateDto from '../../book/models/book-create.dto';

@injectable()
export class CartService implements ICartService {
  constructor(@inject(TYPES.IBookService) private bookService: IBookService) {}
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

  async clearCart(email: string): Promise<any> {
    try {
      console.log(email);
      return await CartModel.deleteMany({ user: email });
    } catch (err) {
      logger.error(`Clear cart: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }

  async checkoutCart(email: string): Promise<any> {
    try {
      const cart = await CartModel.find({ user: email }).populate('product');

      const session = await CartModel.startSession();
      session.startTransaction();

      try {
        const updatePromises = cart.map(async (cartItem) => {
          const book = await this.bookService.getById(cartItem.product._id);
          const bookUpdateDto: BookCreateUpdateDto = {
            ...cartItem.product,
            category: cartItem.product.category._id,
            quantity: book.quantity - cartItem.quantity,
          };
          return this.bookService.updateBook(
            cartItem.product._id,
            bookUpdateDto,
          );
        });

        await Promise.all(updatePromises);

        const result = await CartModel.deleteMany({ user: email });

        await session.commitTransaction();

        return result;
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    } catch (err) {
      logger.error(`Clear cart: ${err}`);
      return Promise.reject({
        error: {
          type: 'internal_server_error',
          message: 'Internal Server Error',
        },
      });
    }
  }
}
