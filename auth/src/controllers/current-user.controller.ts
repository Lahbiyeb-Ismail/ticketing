import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors';

async function currentUserController(req: Request, res: Response) {
  if (!req.session?.jwt) {
    throw new BadRequestError('Not authenticated');
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as {
      id: string;
      email: string;
    };

    res.status(200).send({
      message: 'Current user retrieved successfully',
      data: {
        user: {
          id: payload.id,
          email: payload.email,
        },
      },
    });
  } catch (error) {
    throw new BadRequestError('Not authenticated');
  }
}

export { currentUserController };
