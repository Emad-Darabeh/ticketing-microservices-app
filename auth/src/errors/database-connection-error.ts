import CustomError from './custom-error';

/**
 * database connection error
 */
export default class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to database');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  /**
   * override serializeError()
   */
  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
