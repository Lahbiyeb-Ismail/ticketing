import type { Request, Response } from 'express';
import { User } from '../models';
import { BadRequestError } from '../errors';

async function signupController(req: Request, res: Response) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new BadRequestError('Email already in use.');

  const user = User.build({ email, password });
  await user.save();

  res.status(201).send({
    message: 'User signed up successfully!',
    data: {
      user,
    },
  });
}

export { signupController };
