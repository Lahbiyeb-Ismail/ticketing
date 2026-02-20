import type { NextFunction, Request, Response } from 'express';

import httpStatus, { status } from 'http-status';

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
export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`${err.name} : ${err.message}.`);

  if (process.env.NODE_ENV === 'development') {
    console.log(`Error Stack: ${err.stack}`);
  }

  res.status(500).json({
    success: false,
    statusCode: 500,
    name: err.name,
    message: err.message,
  });

  next();
}
