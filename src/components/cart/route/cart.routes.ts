import express from 'express';

import DIContainer from '../../../config/inversify.config';
import { CartController } from '../controllers/cart.controller';

export const cartRoute = express.Router();

const cartController = DIContainer.resolve<CartController>(CartController);
cartRoute.get('/cart', cartController.get.bind(cartController));
cartRoute.post('/cart', cartController.addToCart.bind(cartController));
cartRoute.put(
  '/cart/:id',
  cartController.updateCartQuantity.bind(cartController),
);
cartRoute.post('/cart/checkout', cartController.checkout.bind(cartController));
cartRoute.delete('/cart/clear', cartController.clearCart.bind(cartController));
cartRoute.delete('/cart/:id', cartController.deleteItem.bind(cartController));
