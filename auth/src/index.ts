import { app } from './app';
import { connectToMongo } from './lib/mongoose';

const bootstrapAuthApp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY environment variable is not defined');
  }

  try {
    await connectToMongo();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log('Auth service is running on port 3000');
  });
};

bootstrapAuthApp();
