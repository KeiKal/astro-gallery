import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://keikal_shop_user:Iygsh4JB9mWnXLIx@cluster0.obxhd.mongodb.net/keikal_shop?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Successfully connected to MongoDB!');

    // Get the database
    const db = client.db('keikal_shop');
    
    // Create a test collection
    const collection = db.collection('test');
    
    // Insert a test document
    const result = await collection.insertOne({
      name: 'Test Product',
      price: 99.99,
      createdAt: new Date()
    });
    
    console.log('Test document inserted:', result);
    
    // Find the document
    const findResult = await collection.findOne({ name: 'Test Product' });
    console.log('Found document:', findResult);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testConnection(); 