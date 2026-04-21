import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

describe('GET Ticket By ID Route', () => {
  it('should return a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it('should return the ticket if the ticket is found', async () => {
    const ticketTitle = 'concert';
    const ticketPrice = 20;

    const authCookie = signup();

    const newTicketRes = await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        title: ticketTitle,
        price: ticketPrice,
      })
      .expect(201);

    const ticketId = newTicketRes.body.ticket.id;

    const ticketResponse = await request(app)
      .get(`/api/tickets/${ticketId}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.ticket.id).toEqual(ticketId);
    expect(ticketResponse.body.ticket.title).toEqual(ticketTitle);
    expect(ticketResponse.body.ticket.price).toEqual(ticketPrice);
  });
});
