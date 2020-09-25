import mongoose from 'mongoose';
import app from './app';

const start = async () => {
  /**
   * check all env vars
   */
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    /**
     * connect to database
     */
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to db');
  } catch (error) {
    console.error(error);
  }

  /**
   * start the server
   */
  app.listen(4000, () => {
    console.log('listening on port 4000');
  });
};

start();
