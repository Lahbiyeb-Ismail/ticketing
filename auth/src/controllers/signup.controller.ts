import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { BadRequestError } from '../errors';

async function signupController(req: Request, res: Response) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new BadRequestError('Email already in use.');

  const user = User.build({ email, password });
  await user.save();

  const authToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!
  );

  req.session = { jwt: authToken };

  res.status(201).send({
    message: 'User signed up successfully!',
    data: {
      user,
    },
  });
}

export { signupController };
