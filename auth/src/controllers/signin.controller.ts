import { BadRequestError } from '@lhticketing/common';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { Password } from '../services';

async function signinController(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new BadRequestError('Invalid credentials.');

  const isPasswordValid = await Password.compare(user.password, password);

  if (!isPasswordValid) throw new BadRequestError('Invalid credentials.');

  const authToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!
  );

  req.session = { jwt: authToken };

  res.status(200).send({
    message: 'User signed in successfully!',
    data: {
      user,
    },
  });
}

export { signinController };
