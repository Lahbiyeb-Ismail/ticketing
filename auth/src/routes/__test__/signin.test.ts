import request from 'supertest';
import { app } from '../../app';

describe('Signin Route', () => {
  describe('Signin Route - Successful Signin', () => {
    it('should return a 200 on successful signin', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(201);

      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(200);
    });

    it('should set a cookie after successful signin', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(201);

      const response = await request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(200);

      expect(response.get('Set-Cookie')).toBeDefined();
    });

    it("should not include the user's password in the response", async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(201);

      const response = await request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(200);

      expect(response.body.data.user.password).toBeUndefined();
    });
  });

  describe('Signin Route - Unregistered Email', () => {
    it('should return a 400 for an unregistered email', async () => {
      return request(app)
        .post('/api/users/signin')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password_123',
        })
        .expect(400);
    });
  });

  describe('Signin Route - Incorrect Password', () => {
    it('should return a 400 for an incorrect password', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(201);

      return request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'incPassword_123',
        })
        .expect(400);
    });
  });

  describe('Signin Route - Validation', () => {
    it('should return a 400 with missing email and password', async () => {
      await request(app).post('/api/users/signin').send({}).expect(400);
    });

    it('should return a 400 with an invalid email', async () => {
      return request(app)
        .post('/api/users/signin')
        .send({
          email: 'invalid-email',
          password: 'Password_123',
        })
        .expect(400);
    });

    it('should return a 400 with an invalid password', async () => {
      return request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'invalid',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is too short', async () => {
      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'Pass',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is not containing a number', async () => {
      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'Password_',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is not containing a lowercase letter', async () => {
      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'PASSWORD_123',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is not containing an uppercase letter', async () => {
      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'password_123',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is not containing a special character', async () => {
      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'test@example.com',
          password: 'Password123',
        })
        .expect(400);
    });
  });
});
