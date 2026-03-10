import express from 'express';
import { validateRequest } from '../middlewares';
import { signupSchema } from '../validation-schemas';
import { signupController } from '../controllers';

const router = express.Router();

router.post(
  '/api/users/signup',
  validateRequest({ body: signupSchema }),
  signupController
);

export { router as signUpRouter };
