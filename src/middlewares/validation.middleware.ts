import { validationResult } from 'express-validator';
import express from 'express';

export const validatorMiddleware = () => {
	return (req: express.Request, res: express.Response, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		next();
	};
};
