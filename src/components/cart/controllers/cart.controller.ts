import { inject, injectable } from 'inversify';
import TYPES from '../../../constants/type';
import express from 'express';
import logger from '../../../utils/logger';
import { ICartService } from '../services/cart.interface.service';
import { ICartCreateDto } from '../models/cart-create.model';
import { ICartDto } from '../models/cart-dto.model';

@injectable()
export class CartController {
  constructor(@inject(TYPES.ICartService) private cartService: ICartService) {}

  public async get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { email } = req.query;

      logger.info('Get cart');
      const cart: ICartDto[] = await this.cartService.get(String(email));

      res.status(200).json(cart);
    } catch (err) {
      logger.error(`get cart: ${err}`);
      next(err);
    }
  }

  async addToCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const cartCreateDto: ICartCreateDto = req.body;

      logger.info('Add to cart');
      const newCart = await this.cartService.addToCart(cartCreateDto);

      res.status(200).json(newCart);
    } catch (err) {
      logger.error(`add to cart: ${err}`);
      next(err);
    }
  }

  async updateCartQuantity(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      logger.info('Update cart quantity');
      const updatedCart = await this.cartService.updateQuantity(
        id,
        Number(quantity),
      );

      res.status(200).json(updatedCart);
    } catch (err) {
      logger.error(`update cart quantity: ${err}`);
      next(err);
    }
  }

  async clearCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { email } = req.query;

      logger.info('Clear Cart');
      await this.cartService.clearCart(String(email));

      res.status(200).json({ message: 'Remove item from cart successfully' });
    } catch (err) {
      logger.error(`Clear Cart: ${err}`);
      next(err);
    }
  }

  async deleteItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { id } = req.params;

      logger.info('Remove item from cart');
      await this.cartService.removeFromCart(id);

      res.status(200).json({ message: 'Remove item from cart successfully' });
    } catch (err) {
      logger.error(`Remove item from cart: ${err}`);
      next(err);
    }
  }

  async checkout(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { email } = req.query;

      logger.info('Checkout');
      await this.cartService.checkoutCart(String(email));

      res.status(200).json({ message: 'Checkout successfully' });
    } catch (err) {
      logger.error(`get: ${err}`);
      next(err);
    }
  }
}
