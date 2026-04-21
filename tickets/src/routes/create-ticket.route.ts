import { Router, type Request, type Response } from 'express';
import { validateRequest, requireAuthMiddleware } from '@lhticketing/common';

import { createTicketSchema } from '../validation-schema';
import { Ticket } from '../models';

const createTicketRouter = Router();

createTicketRouter.post(
  '/api/tickets',
  requireAuthMiddleware,
  validateRequest({ body: createTicketSchema }),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    res.status(201).send({ message: 'Ticket created successfully!', ticket });
  }
);

export { createTicketRouter };
