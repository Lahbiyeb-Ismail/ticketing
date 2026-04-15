import type { Request, Response } from 'express';

import { NotAuthorizedError } from '@lhticketing/common';

async function currentUserController(req: Request, res: Response) {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  res.status(200).send({
    message: 'Current user retrieved successfully',
    data: {
      user: req.currentUser,
    },
  });
}

export { currentUserController };
