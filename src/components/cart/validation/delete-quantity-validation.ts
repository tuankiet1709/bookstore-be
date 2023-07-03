import { Schema } from 'express-validator';

export const deleteCartValidation: Schema = {
  id: {
    in: ['params'],
    notEmpty: true,
  },
};
