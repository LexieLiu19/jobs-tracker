import mongoose from 'mongoose';
import validator from 'validator';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false, //won't return password
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'Last Name',
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'My City',
  },
});

// hash password
UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));

  // if password is updated, re-hash it. else return.
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//custom instance method
// JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JW_LIFETIME,
  });
};

//compare password for login function
UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export default mongoose.model('User', UserSchema);
