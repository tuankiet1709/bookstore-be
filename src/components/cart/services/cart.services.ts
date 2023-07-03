import { inject, injectable } from 'inversify';
import { ICartService } from './cart.interface.service';
import { CartModel, ICart } from '../models/cart.models';
import { ICartCreateDto } from '../models/cart-create.model';
import { BookModel, IBookService } from '../../book';
import ApiError from '../../../middlewares/error-handling.middleware';
import { ICartDto } from '../models/cart-dto.model';
import TYPES from '../../../constants/type';
import BookCreateUpdateDto from '../../book/models/book-create.dto';

@injectable()
export class CartService implements ICartService {
  constructor(@inject(TYPES.IBookService) private bookService: IBookService) {}
  async get(email: string): Promise<ICartDto[]> {
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
  }

  async addToCart(cartCreateDto: ICartCreateDto): Promise<any> {
    const productRef = await BookModel.findById(cartCreateDto.product);
    if (!productRef) {
      throw new ApiError(404, 'Not Found Book');
    }

    const newCart = {
      product: productRef,
      quantity: cartCreateDto.quantity,
      user: cartCreateDto.user,
    };

    return await CartModel.create(newCart);
  }

  async updateQuantity(id: string, quantity: number): Promise<any> {
    return await CartModel.findByIdAndUpdate(id, {
      quantity: quantity,
    });
  }

  async removeFromCart(id: string): Promise<any> {
    return await CartModel.findByIdAndDelete(id);
  }

  async clearCart(email: string): Promise<any> {
    return await CartModel.deleteMany({ user: email });
  }

  async checkoutCart(email: string): Promise<any> {
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
        return this.bookService.updateBook(cartItem.product._id, bookUpdateDto);
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
  }
}
