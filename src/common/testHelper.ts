import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error: any) {
      if (error.message === 'ns not found') return;
      if (error.message.includes('a background operation is currently running'))
        return;
      console.log(error.message);
    }
  }
}

export default {
  setupDB(databaseName: string, cleanUp?: boolean): void {
    // Connect to Mongoose
    beforeAll(async () => {
      const url = `mongodb://127.0.0.1:4444/${databaseName}`;
      await mongoose.connect(url);
    });

    // Cleans up database between each test
    if (cleanUp) {
      afterEach(async () => {
        await removeAllCollections();
      });
    }

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
};
