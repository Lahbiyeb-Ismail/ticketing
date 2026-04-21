import express from 'express';
import cookieSession from 'cookie-session';
import {
  globalErrorHandler,
  notFoundRoute,
  currentUserMiddleware,
} from '@lhticketing/common';

import {
  createTicketRouter,
  getAllTicketsRouter,
  getTicketRouter,
  updateTicketRouter,
} from './routes';

const app = express();

app.use(express.json());
app.set('trust proxy', true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserMiddleware);

app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(getAllTicketsRouter);
app.use(updateTicketRouter);

app.use(notFoundRoute);

app.use(globalErrorHandler);

export { app };
