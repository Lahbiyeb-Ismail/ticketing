import express from 'express';

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';
import { globalErrorHandler, notFoundRoute } from './middlewares';
import mongoose from 'mongoose';

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
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
 
  app.listen(3000, () => {
    console.log('Auth service is running on port 3000');
  });
};

bootstrapAuthApp();
