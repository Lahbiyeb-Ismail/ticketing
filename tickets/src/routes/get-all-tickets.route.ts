import { Router, type Request, type Response } from 'express';

import { Ticket } from '../models';

const getAllTicketsRouter = Router();

getAllTicketsRouter.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.status(200).send({ message: 'Tickets fetched successfully!', tickets });
});

export { getAllTicketsRouter };
