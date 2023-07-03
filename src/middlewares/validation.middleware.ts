import { validationResult } from 'express-validator';
import * as express from 'express';
import ApiError from './error-handling.middleware';

export const validatorMiddleware = () => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(
        400,
        'Missing required information. Please provide all search parameters.',
      );
    }

    next();
  };
};
