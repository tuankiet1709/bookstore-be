import { Schema } from 'express-validator';

export const updateCartValidation: Schema = {
  id: {
    in: ['params'],
    notEmpty: true,
  },
  quantity: {
    in: ['body'],
    notEmpty: true,
  },
};
