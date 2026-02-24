import { status } from 'http-status';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  public errorName = 'NOT_FOUND_ERROR';
  public statusCode = status.NOT_FOUND;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
