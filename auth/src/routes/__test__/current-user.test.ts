import request from 'supertest';
import { app } from '../../app';

describe('Current User Route', () => {
  it('should return current user details', async () => {
    const cookie = await signup();

    // Use the cookie to make a request to the current user route
    const currentUserResponse = await request(app)
      .get('/api/users/current-user')
      .set('Cookie', cookie)
      .expect(200);

    expect(currentUserResponse.body.data.user.email).toBeDefined();
    expect(currentUserResponse.body.data.user.password).toBeUndefined();
  });

  it('should return 401 if not authenticated', async () => {
    await request(app).get('/api/users/current-user').expect(401);
  });
});
