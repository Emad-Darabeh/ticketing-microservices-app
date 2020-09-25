import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import RequestValidationError from '../errors/request-validation-error';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  /**
   * check if there are any request validation errors
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  /**
   * if there are no request validation errors got to the next handler
   */
  next();
};

export default validateRequest;
