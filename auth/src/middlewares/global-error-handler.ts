import type { NextFunction, Request, Response } from 'express';

import { CustomError } from '../errors';

/**
 *
 * Middleware function to handle errors in the application.
 *
 * @param err - The error object.
 * @param _req - The request object (not used in this middleware).
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * Logs the error stack to the console, sets the response status code to 500
 * if it is not already set, and sends a JSON response with the error message.
 * Calls the next middleware function in the stack.
 *
 */
export async function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`${err.name} : ${err.message}.`);

  if (process.env.NODE_ENV === 'development') {
    console.log(`Error Stack: ${err.stack}`);
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      errorName: err.errorName,
      errors: err.serializeErrors(),
    });
  }

  res.status(400).json({
    success: false,
    statusCode: 400,
    errorName: 'BAD_REQUEST',
    errors: [{ message: err.message }],
  });

  next();
}
