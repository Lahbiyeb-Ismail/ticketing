import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  const authCookie = signup();

  return request(app)
    .post('/api/tickets')
    .set('Cookie', authCookie)
    .send({ title: 'Concert', price: 50 });
};

describe('Get All Tickets Route', () => {
  it('should return an empty array if there are no tickets', async () => {
    const response = await request(app).get('/api/tickets').expect(200);

    expect(response.body.tickets).toEqual([]);
  });

  it('should return all tickets', async () => {
    // Create some tickets first
    await createTicket();

    await createTicket();

    const response = await request(app).get('/api/tickets').expect(200);

    expect(response.body.tickets.length).toBe(2);
  });
});
