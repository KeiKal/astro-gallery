import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://keikal_shop_user:Iygsh4JB9mWnXLIx@cluster0.obxhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB.");
    
    // Test database operations
    const database = client.db("sample_mflix");
    const collections = await database.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await client.close();
  }
}

run(); 