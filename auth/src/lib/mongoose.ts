import mongoose from 'mongoose';

async function connectToMongo() {
  const dbUrl = 'mongodb://auth-mongo-srv:27017/auth';

  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is not defined!!');
  }

  await mongoose.connect(dbUrl);
}

export { connectToMongo };
