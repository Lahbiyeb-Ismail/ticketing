import express from 'express';
import { requestValidator } from '../middlewares';
import { signupSchema } from '../validation-schemas';
import { signupController } from '../controllers';

const router = express.Router();

router.post(
  '/api/users/signup',
  requestValidator({ body: signupSchema }),
  signupController
);

export { router as signUpRouter };
