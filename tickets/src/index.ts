import { app } from './app';
import { connectToMongo } from '@lhticketing/common';

const bootstrapTicketsApp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY environment variable is not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
  }

  try {
    await connectToMongo(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log('Tickets service is running on port 3000');
  });
};

bootstrapTicketsApp();
