// import 'express-async-errors';
import express from 'express';

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';
import { globalErrorHandler } from './middlewares';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log('Auth service is running on port 3000');
});
