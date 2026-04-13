import express from 'express';
import cookieSession from 'cookie-session';

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';
import { globalErrorHandler, notFoundRoute } from './middlewares';

const app = express();

app.use(express.json());
app.set('trust proxy', true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(notFoundRoute);

app.use(globalErrorHandler);

export { app };
