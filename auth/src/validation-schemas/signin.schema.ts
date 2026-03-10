import { z } from 'zod';

export const signinSchema = z
  .object({
    email: z
      .email({ message: 'Invalid email format. Please try another one.' })
      .max(255, { message: 'Email must be at most 255 characters long.' }),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, {
        message:
          'Password must include a lowercase, uppercase, number, and special character.',
      })
      .min(8, { message: 'Password must be at least 8 characters.' })
      .max(128, { message: 'Password must be at most 128 characters.' })
      .refine((value) => !/['"<>;(){}]/.test(value), {
        message: 'Password cannot contain special characters like \'"<>;(){}.',
      }),
  })
  .strict();
