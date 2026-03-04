import express from 'express';

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';
import { globalErrorHandler, notFoundRoute } from './middlewares';
import { connectToMongo } from './lib/mongoose';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(notFoundRoute);

app.use(globalErrorHandler);

const bootstrapAuthApp = async () => {
  try {
    await connectToMongo();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log('Auth service is running on port 3000');
  });
};

bootstrapAuthApp();
