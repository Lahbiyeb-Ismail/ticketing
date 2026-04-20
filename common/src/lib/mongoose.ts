import mongoose from 'mongoose';

async function connectToMongo(mongoUri: string) {
  if (!mongoUri) {
    throw new Error('MongoDB URI is not defined in environment variables');
  }

  await mongoose.connect(mongoUri);
}

export { connectToMongo };
