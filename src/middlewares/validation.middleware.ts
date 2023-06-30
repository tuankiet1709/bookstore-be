import { validationResult } from 'express-validator';
import * as express from 'express';

export const validatorMiddleware = () => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};
