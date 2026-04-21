import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  function signup(): string[];
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

global.signup = (): string[] => {
  const jwtPayload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create JWT
  const authToken = jwt.sign(jwtPayload, process.env.JWT_KEY!);

  // Build session Object { jwt: MY_JWT }
  const session = { jwt: authToken };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string that's the cookie with the encoded data
  return [`session=${base64}`];
};
