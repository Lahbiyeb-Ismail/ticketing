import express from 'express';
import { currentUserController } from '../controllers';
import { currentUserMiddleware } from '../middlewares';

const router = express.Router();

router.get(
  '/api/users/current-user',
  currentUserMiddleware,
  currentUserController
);

export { router as currentUserRouter };
