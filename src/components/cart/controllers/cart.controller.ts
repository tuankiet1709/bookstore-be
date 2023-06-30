import { inject, injectable } from 'inversify';
import TYPES from '../../../constants/type';
import express from 'express';
import logger from '../../../utils/logger';
import ApiError from '../../../middlewares/error-handling.middleware';
import { ICartService } from '../services/cart.interface.service';
import { ICartCreateDto } from '../models/cart-create.model';
import { ICartDto } from '../models/cartDto.model';

@injectable()
export class CartController {
  private cartService: ICartService;

  constructor(@inject(TYPES.ICartService) cartService: ICartService) {
    this.cartService = cartService;
  }

  public async get(req: express.Request, res: express.Response) {
    try {
      const { email } = req.query;

      console.log(req.query);

      logger.info('Get cart');
      const cart: ICartDto[] = await this.cartService.get(String(email));

      res.status(200).json(cart);
    } catch (err) {
      logger.error(`get cart: ${err}`);
      throw new ApiError(500, 'Internal Server Error');
    }
  }

  async addToCart(req: express.Request, res: express.Response) {
    try {
      const cartCreateDto: ICartCreateDto = req.body;
      console.log(cartCreateDto);

      logger.info('Add to cart');
      const newCart = await this.cartService.addToCart(cartCreateDto);

      res.status(200).json(newCart);
    } catch (err) {
      res.status(503).send(err);
    }
  }

  async updateCartQuantity(req: express.Request, res: express.Response) {
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
      res.status(503).send(err);
    }
  }

  async deleteItem(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;

      logger.info('Remove item from cart');
      await this.cartService.removeFromCart(id);

      res.status(200).json({ message: 'Remove item from cart successfully' });
    } catch (err) {
      res.status(503).send(err);
    }
  }
}
