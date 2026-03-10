import express from 'express';
import { signoutController } from '../controllers';

const router = express.Router();

router.post('/api/users/signout', signoutController);

export { router as signOutRouter };
