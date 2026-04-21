import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models';

describe('Create Ticket Route', () => {
  it('should return 401 if user is not authenticated', async () => {
    await request(app)
      .post('/api/tickets')
      .send({
        title: 'Concert Ticket',
        price: 50,
      })
      .expect(401);
  });

  it('should create a ticket with valid inputs', async () => {
    const ticketTitle = 'Concert Ticket';
    const ticketPrice = 50;

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const authCookie = signup();

    await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        title: ticketTitle,
        price: ticketPrice,
      })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);

    expect(tickets[0].title).toEqual(ticketTitle);
    expect(tickets[0].price).toEqual(ticketPrice);
  });

  it('should accept a float price', async () => {
    const ticketTitle = 'Concert Ticket';
    const ticketPrice = 50.99;

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const authCookie = signup();

    await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        title: ticketTitle,
        price: ticketPrice,
      })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);

    expect(tickets[0].title).toEqual(ticketTitle);
    expect(tickets[0].price).toEqual(ticketPrice);
  });

  it('should return 400 if title is missing', async () => {
    const authCookie = signup();

    await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        price: 50,
      })
      .expect(400);
  });

  it('should return 400 if price is missing', async () => {
    const authCookie = signup();

    await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        title: 'Concert Ticket',
      })
      .expect(400);
  });

  it('should return 400 if price is negative', async () => {
    const authCookie = signup();

    await request(app)
      .post('/api/tickets')
      .set('Cookie', authCookie)
      .send({
        title: 'Concert Ticket',
        price: -10,
      })
      .expect(400);
  });
});
