import { Schema } from 'express-validator';

export const bookDeleteValidation: Schema = {
	id: {
		in: ['query'],
		notEmpty: true,
	},
};
