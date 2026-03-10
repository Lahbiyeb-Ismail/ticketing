import type { Request, Response } from 'express';

async function signoutController(req: Request, res: Response) {
  req.session = null;

  res.status(200).send({
    message: 'User signed out successfully',
    data: null,
  });
}

export { signoutController };
