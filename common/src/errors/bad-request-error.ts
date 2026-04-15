import { status } from 'http-status';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  public errorName = 'BAD_REQUEST_ERROR';
  public statusCode = status.BAD_REQUEST;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
