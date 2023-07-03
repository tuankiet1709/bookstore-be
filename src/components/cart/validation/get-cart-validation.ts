import { Schema } from 'express-validator';

export const getCartValidation: Schema = {
  email: {
    in: ['query'],
    notEmpty: true,
  },
};
