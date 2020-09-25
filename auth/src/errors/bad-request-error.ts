import CustomError from './custom-error';

/**
 * bad request error
 */
export default class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  /**
   * override serializeError()
   */
  serializeError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
