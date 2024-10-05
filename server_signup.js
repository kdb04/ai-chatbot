const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection settings
const url = 'mongodb://localhost:27017';
const dbName = 'codefusion';

// Function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db(dbName);
}

// Handle registration request
app.post('/register', async (req, res) => {
  try {
    // Extracting data from request body
    const { Name, Phone, Email, Password } = req.body;

    // Connect to the database
    const db = await connectToDatabase();

    // Check if email already exists (optional, but recommended)
    const existingUser = await db.collection('Signup').findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Insert new user into the database
    await db.collection('Signup').insertOne({ Name, Phone, Email, Password });

    // Send success response
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});