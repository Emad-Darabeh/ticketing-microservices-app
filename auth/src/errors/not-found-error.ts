import CustomError from './custom-error';

/**
 * not found error
 */
export default class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  /**
   * override serializeError()
   */
  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Not found' }];
  }
}
