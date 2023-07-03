import express from 'express';

import DIContainer from '../../../config/inversify.config';
import { CartController } from '../controllers/cart.controller';
import { checkSchema } from 'express-validator';
import { validatorMiddleware } from '../../../middlewares/validation.middleware';
import { getCartValidation } from '../validation/get-cart-validation';
import { updateCartValidation } from '../validation/update-quantity-validation';
import { deleteCartValidation } from '../validation/delete-quantity-validation';
import { cartCreateValidation } from '../validation/cart-create.validation';

export const cartRoute = express.Router();

const cartController = DIContainer.resolve<CartController>(CartController);
cartRoute.get(
  '/cart',
  checkSchema(getCartValidation),
  validatorMiddleware(),
  cartController.get.bind(cartController),
);
cartRoute.post(
  '/cart',
  checkSchema(cartCreateValidation),
  validatorMiddleware(),
  cartController.addToCart.bind(cartController),
);
cartRoute.put(
  '/cart/:id',
  checkSchema(updateCartValidation),
  validatorMiddleware(),
  cartController.updateCartQuantity.bind(cartController),
);
cartRoute.post(
  '/cart/checkout',
  checkSchema(getCartValidation),
  validatorMiddleware(),
  cartController.checkout.bind(cartController),
);
cartRoute.delete(
  '/cart/clear',
  checkSchema(getCartValidation),
  validatorMiddleware(),
  cartController.clearCart.bind(cartController),
);
cartRoute.delete(
  '/cart/:id',
  checkSchema(deleteCartValidation),
  validatorMiddleware(),
  cartController.deleteItem.bind(cartController),
);
