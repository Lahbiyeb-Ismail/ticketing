import { z } from 'zod';

export const updateTicketSchema = z
  .object({
    title: z.string().min(2).max(100).optional(),
    price: z.coerce.number().positive().optional(),
  })
  .strict();
