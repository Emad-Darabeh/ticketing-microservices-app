import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import PasswordManager from '../services/password-manager';

/**
 * errors
 */
import BadRequestError from '../errors/bad-request-error';

/**
 * models
 */
import User from '../models/user';

/**
 * middleware
 */
import validateRequest from '../middleware/validate-request';

/**
 * @constant SIGNIN_ROUTER
 */
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    /**
     * check if a user with the same email exists in the database
     */
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    /**
     * check if the provided password is matched with the stored password
     */
    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    /**
     * generate jwt
     */
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    /**
     * store the token on session object
     */
    req.session = {
      ...req.session,
      jwt: userJwt,
    };

    res.send(existingUser);
  }
);

export default router;
