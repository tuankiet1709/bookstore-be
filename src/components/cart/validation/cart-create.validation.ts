import { Schema } from 'express-validator';

export const cartCreateValidation: Schema = {
  product: {
    in: ['body'],
    notEmpty: true,
    isString: true,
  },
  user: {
    in: ['body'],
    notEmpty: true,
    isString: true,
  },
  quantity: {
    in: ['body'],
    notEmpty: true,
    isInt: true,
  },
};
