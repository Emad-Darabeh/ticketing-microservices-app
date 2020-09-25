/**
 * custom error abstract class
 */
export default abstract class CustomError extends Error {
  /**
   * attrs
   */
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  /**
   * methods
   */
  abstract serializeError(): { message: string; field?: string }[];
}
