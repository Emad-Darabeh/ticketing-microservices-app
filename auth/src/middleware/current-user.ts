import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * interface to defile the properties of a userPayload
 */
interface UserPayload {
  id: string;
  email: string;
}

/**
 * modify the express request interface to accommodate the currentUser property
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * check if the session is set
   */
  if (!req.session?.jwt) {
    return next();
  }

  /**
   * check if the jwt is valid
   */
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};

export default currentUser;
