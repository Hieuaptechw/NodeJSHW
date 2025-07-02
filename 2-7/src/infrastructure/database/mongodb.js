const { MongoClient } = require('mongodb');

let client;
let db;

async function connect() {
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.MONGODB_DB_NAME);
  console.log('Connected to MongoDB');
}

function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

async function close() {
  if (client) {
    await client.close();
  }
}

module.exports = { connect, getDb, close };