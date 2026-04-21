import { Router, type Request, type Response } from 'express';
import {
  validateRequest,
  requireAuthMiddleware,
  NotFoundError,
  NotAuthorizedError,
} from '@lhticketing/common';

import { updateTicketSchema } from '../validation-schema';
import { Ticket } from '../models';

const updateTicketRouter = Router();

updateTicketRouter.put(
  '/api/tickets/:id',
  requireAuthMiddleware,
  validateRequest({ body: updateTicketSchema }),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    res.send({ message: 'Ticket updated successfully!', ticket });
  }
);

export { updateTicketRouter };
