import CustomError from './custom-error';

export default class UnauthorizedError extends CustomError {
  statusCode = 401;
  message = 'Not authorized';

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
