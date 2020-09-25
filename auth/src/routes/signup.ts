import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

/**
 * errors
 */
import RequestValidationError from '../errors/request-validation-error';
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
 * @constant SIGNUP_ROUTER
 */
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    /**
     * check if a user with the same email exists in the database
     */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('email in use');
    }

    /**
     * create a new user in the database
     */
    const user = User.build({ email, password });
    await user.save();

    /**
     * generate jwt
     */
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    /**
     * store the token on session object
     */
    req.session = {
      ...req.session,
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export default router;
