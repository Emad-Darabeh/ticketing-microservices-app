import express from 'express';
import 'express-async-errors';

import cookieSession from 'cookie-session';

import NotFoundError from './errors/not-found-error';

import currentUserRouter from './routes/current-user';
import signupRouter from './routes/signup';
import signinRouter from './routes/signin';
import signoutRouter from './routes/signout';
import { errorHandler } from './middleware/error-handler';

/**
 * @constant App
 */
const app = express();
app.set('trust proxy', true);

/**
 * add middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

/**
 * handling 404 not found paths
 */
app.all('*', () => {
  throw new NotFoundError();
});

/**
 * handling all errors
 */
app.use(errorHandler);

export default app;
