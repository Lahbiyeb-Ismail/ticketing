import request from 'supertest';
import { app } from '../../app';

describe('Signup Route', () => {
  describe('Signup Route - Successful Signup', () => {
    it('should return a 201 on successful signup', async () => {
      return request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(201);
    });

    it('should set a cookie after successful signup', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(201);

      expect(response.get('Set-Cookie')).toBeDefined();
    });
  });

  describe('Signup Route - Validation', () => {
    it('should return a 400 with missing email and password', async () => {
      await request(app).post('/api/users/signup').send({}).expect(400);
    });

    it('should return a 400 with an invalid email', async () => {
      return request(app)
        .post('/api/users/signup')
        .send({
          email: 'invalid-email',
          password: 'Password_123',
        })
        .expect(400);
    });

    it('should return a 400 with an invalid password', async () => {
      return request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'invalid',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is too short', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Pass',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is not containing a number', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is not containing a lowercase letter', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'PASSWORD_123',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is not containing an uppercase letter', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'password_123',
        })
        .expect(400);
    });

    it('should return a 400 with a password that is not containing a special character', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password123',
        })
        .expect(400);
    });
  });

  describe('Signup Route - Duplicate Emails', () => {
    it('should disallow duplicate emails', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(201);

      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'Password_123',
        })
        .expect(400);
    });
  });
});
