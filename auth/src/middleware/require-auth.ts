import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorized-error';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }

  next();
};

export default requireAuth;
