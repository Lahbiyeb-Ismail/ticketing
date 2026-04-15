import { status } from 'http-status';
import { CustomError } from './custom-error';

interface ValidationError {
  message: string;
  field: string;
}

export class RequestValidationError extends CustomError {
  public errorName = 'REQUEST_VALIDATION_ERROR';
  public statusCode = status.BAD_REQUEST;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters.');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.message,
      field: err.field,
    }));
  }
}
