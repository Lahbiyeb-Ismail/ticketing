import type { Request, Response } from 'express';

async function signupController(req: Request, res: Response) {
  // Extract user details from the request body
  const { email, password } = req.body;

  console.log('Received signup request with email:', email);
  console.log('Received signup request with password:', password);

  // Here you would typically add logic to create a new user in your database
  // For example:
  // const newUser = await User.create({ email, password });

  // For this example, we'll just return a success message
  res.status(201).send({ message: 'User signed up successfully!' });
}

export { signupController };
