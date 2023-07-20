// server.js

const express = require('express');
const mongoose = require('mongoose');
const User = require('./config/models/User'); 
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
console.log(process.env.DB_CONNECTION_URI);


// create Express app

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());


// connect to the database

mongoose.connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

  
// GET all users

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// POST new user

app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// PUT edit user by ID

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// DELETE user by ID

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});