import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://public:yq2FU8yBWTXOSutT@cluster0.tbbl3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable in .env.local');
}

// Cached connection to prevent multiple connections during hot reloads in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}