import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/custom-error';

/**
 * handling all errors
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    // log errors in development mode
    console.log(err);
  }

  /**
   * handling custom errors
   */
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  /**
   * handling the rest of the errors
   */
  res.status(500).send({ errors: [{ message: 'something went wrong' }] });
};
