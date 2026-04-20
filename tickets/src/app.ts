import express from 'express';
import cookieSession from 'cookie-session';
import { globalErrorHandler, notFoundRoute } from '@lhticketing/common';

const app = express();

app.use(express.json());
app.set('trust proxy', true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(notFoundRoute);

app.use(globalErrorHandler);

export { app };
