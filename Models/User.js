const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcrypt');

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
  id: {
    type: String,
    required: [true, 'Must have storeID'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Must have password'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// hashing password before saveing to database
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', UserSchema);

function validateRegister(body) {
  const registerRules = joi.object({
    name: joi.string().required().min(2).max(20),
    phone: joi.string().required().min(6).max(12),
    id: joi.string().required().min(1).max(20),
    password: joi.string().required().min(6).max(12),
  });
  return registerRules.validate(body);
}

module.exports = { User, validateRegister };
