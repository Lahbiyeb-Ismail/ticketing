import express from 'express';
import { validateRequest } from '@lhticketing/common';
import { signinSchema } from '../validation-schemas';
import { signinController } from '../controllers';

const router = express.Router();

router.post(
  '/api/users/signin',
  validateRequest({ body: signinSchema }),
  signinController
);

export { router as signInRouter };
