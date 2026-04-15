import request from 'supertest';
import { app } from '../../app';

describe('Signout Route', () => {
  it('should return a 200 on successful signout', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@example.com',
        password: 'Password_123',
      })
      .expect(201);

    await request(app).post('/api/users/signout').send({}).expect(200);
  });
});
