const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User Must Have a name !'],
  },
  phone: {
    type: String,
    required: [true, 'A User Must Have a Phone number !'],
    unique: true,
  },
  storeID: {
    type: String,
    required: [true, 'Must have storeID'],
  },
  password: {
    type: String,
    required: [true, 'Must have password'],
    minlength: 8,
    maxlength: 1000,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
