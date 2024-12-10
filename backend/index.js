import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';  

const app = express();
app.use(express.json());
app.use(cors());

const url = 'mongodb://localhost:27017';
const dbName = 'tummyfy';
let db;
const PORT = 5000;

const connectMongo = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.log('Error connecting to the database:', error);
  }
};

connectMongo();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sign Up Endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await db.collection('user').findOne({ 
      $or: [
        { username },
        { email },
        { phoneNumber }
      ]
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      if (existingUser.phoneNumber === phoneNumber) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }
    }

    const newUser = { 
      username, 
      email, 
      phoneNumber, 
      password,
      addresses: [], // Initialize empty addresses array
      createdAt: new Date()
    };
    
    const result = await db.collection('user').insertOne(newUser);
    res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.insertedId 
    });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: 'Server error, please try again' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.collection('user').findOne({ username, password });

    if (user) {
      console.log('User logged in:', user);
      res.status(200).json({ 
        message: 'Login successful', 
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          addresses: user.addresses || []
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Data Endpoint
app.get('/api/user/:userId', async (req, res) => {
  try {
    const user = await db.collection('user').findOne(
      { _id: new ObjectId(req.params.userId) }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize addresses if they don't exist
    if (!user.addresses) {
      await db.collection('user').updateOne(
        { _id: user._id },
        { $set: { addresses: [] } }
      );
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      addresses: user.addresses || []
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add Address Endpoint
app.post('/api/address', async (req, res) => {
  const { userId, address } = req.body;

  if (!userId || !address) {
    return res.status(400).json({ message: 'User ID and address are required' });
  }

  try {
    console.log('Adding address for user:', userId);
    console.log('Address data:', address);

    const result = await db.collection('user').updateOne(
      { _id: new ObjectId(userId) },
      { 
        $push: { 
          addresses: {
            ...address,
            id: new Date().getTime(), // Add unique identifier
            createdAt: new Date()
          }
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Failed to add address' });
    }

    // Fetch updated user data
    const updatedUser = await db.collection('user').findOne(
      { _id: new ObjectId(userId) }
    );

    res.status(200).json({ 
      message: 'Address added successfully',
      addresses: updatedUser.addresses
    });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Address Endpoint
app.put('/api/address/:userId/:addressId', async (req, res) => {
  const { userId, addressId } = req.params;
  const { address } = req.body;

  try {
    const result = await db.collection('user').updateOne(
      { 
        _id: new ObjectId(userId),
        'addresses.id': parseInt(addressId)
      },
      { 
        $set: { 
          'addresses.$': {
            ...address,
            id: parseInt(addressId),
            updatedAt: new Date()
          }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address updated successfully' });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Address Endpoint
app.delete('/api/address/:userId/:addressId', async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const result = await db.collection('user').updateOne(
      { _id: new ObjectId(userId) },
      { 
        $pull: { 
          addresses: { id: parseInt(addressId) }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Your existing restaurant endpoints
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await db.collection('restaurants').find().toArray();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

app.get('/api/restaurants/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await db.collection('restaurants').findOne({ id: parseInt(id) });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const restaurants = await db.collection('restaurants').find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { 'menu.name': { $regex: query, $options: 'i' } }
      ]
    }).limit(10).toArray();

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).send('Error fetching suggestions');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});