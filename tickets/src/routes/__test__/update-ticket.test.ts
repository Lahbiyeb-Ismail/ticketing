import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('Update Ticket Route', () => {
  it('should return a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const authCookie = signup();

    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', authCookie)
      .send({
        title: 'Updated Title',
        price: 100,
      })
      .expect(404);
  });

  it('should return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: 'Updated Title',
        price: 100,
      })
      .expect(401);
  });

  it('should return a 401 if the user does not own the ticket', async () => {
    const authCookie = signup();

    // Create a ticket with one user
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        title: 'Original Title',
        price: 50,
      })
      .expect(201);

    const ticketId = response.body.ticket.id;

    // Attempt to update the ticket with a different user
    const anotherAuthCookie = signup(); // Sign up as a different user

    await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', anotherAuthCookie)
      .send({
        title: 'Updated Title',
        price: 100,
      })
      .expect(401);
  });

  it('should return a 400 if the user provides an invalid title or price', async () => {
    const authCookie = signup();

    // Create a ticket
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        title: 'Original Title',
        price: 50,
      })
      .expect(201);

    const ticketId = response.body.ticket.id;

    // Attempt to update the ticket with an invalid title
    await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', authCookie)
      .send({
        title: '',
        price: 100,
      })
      .expect(400);

    // Attempt to update the ticket with an invalid price
    await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', authCookie)
      .send({
        title: 'Updated Title',
        price: -10,
      })
      .expect(400);
  });

  it('updates the ticket provided valid inputs', async () => {
    const authCookie = signup();

    // Create a ticket
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        title: 'Original Title',
        price: 50,
      })
      .expect(201);

    const ticketId = response.body.ticket.id;

    // Update the ticket with valid inputs
    await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', authCookie)
      .send({
        title: 'Updated Title',
        price: 100,
      })
      .expect(200);

    // Fetch the updated ticket
    const ticketResponse = await request(app)
      .get(`/api/tickets/${ticketId}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.ticket.title).toEqual('Updated Title');
    expect(ticketResponse.body.ticket.price).toEqual(100);
  });
});
