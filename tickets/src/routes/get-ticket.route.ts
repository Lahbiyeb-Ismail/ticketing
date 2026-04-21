import { Router, type Request, type Response } from 'express';
import { NotFoundError } from '@lhticketing/common';

import { Ticket } from '../models';

const getTicketRouter = Router();

getTicketRouter.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticketId = req.params.id;

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError('Ticket not found');
  }

  res.status(200).send({ message: 'Ticket fetched successfully!', ticket });
});

export { getTicketRouter };
