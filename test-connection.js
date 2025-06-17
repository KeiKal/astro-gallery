import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("DATABASE_URL is not defined in environment variables");
  process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB.");
    
    // Test database operations
    const database = client.db("keikal_shop"); // Updated to match your application's database
    const collections = await database.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await client.close();
  }
}

run(); 