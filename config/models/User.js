// models/User.js

const mongoose = require('mongoose');


// define the User schema

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});


// create the User model

const User = mongoose.model('User', userSchema);


// export the model

module.exports = User;