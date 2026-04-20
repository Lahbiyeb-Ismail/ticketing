import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

declare global {
  function signup(): Promise<string[]>;
}

let mongod: MongoMemoryServer;

// The first run may need to download a MongoDB binary, which can exceed 5s.
jest.setTimeout(120000);

beforeAll(async () => {
  process.env.JWT_KEY = 'test_jwt_key';

  mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongod) {
    await mongod.stop();
  }
  await mongoose.connection.close();
});

global.signup = async (): Promise<string[]> => {
  const email = 'test@test.com';
  const password = 'Password_123';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie')!;

  return cookie;
};
