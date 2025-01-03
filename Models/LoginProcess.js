const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  user_id: {
    type: String,
    default: uuidv4
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return !/\s/.test(v);
      },
      message: 'Username cannot contain spaces'
    }
  },
  mail: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
  },
  role: { 
    type: String,
    enum: ['User', 'Admin'], 
    default: 'User' 
  },
  otp: {
    type: String,
    required: [true, 'OTP is required'],
  },
  jwtToken:{
    type:String,
  },
  otpExpires: {
    type: Date,
    required: [true, 'OTP expiration time is required'],
  },
  password: {
    type: String,
  },
}, {
  timestamps: true,
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
      { userId: this._id, mobileNumber: this.mobileNumber },
      'your_jwt_secret_key', 
      { expiresIn: '1h' }
  );
  this.jwtToken = token;
  await this.save(); 
  return token;
};

const LoginProcess = mongoose.model('LoginProcess', userSchema);

module.exports = LoginProcess;
