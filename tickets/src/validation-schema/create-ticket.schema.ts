import { z } from 'zod';

export const createTicketSchema = z
  .object({
    title: z.string().min(2).max(100),
    price: z.coerce.number().positive(),
  })
  .strict();
