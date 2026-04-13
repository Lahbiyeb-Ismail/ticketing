import { status } from 'http-status';
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  public errorName = 'NOT_AUTHORIZED_ERROR';
  public statusCode = status.UNAUTHORIZED;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
