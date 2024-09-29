import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true , required: true },
  password: {type: String},
  image: String,
  provider: String,
  isAdmin: { type: Boolean , default: false },
  isVerified: {type: Boolean , default: false},
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  otp: {type: String , },
  otpExpiry: {type: Date ,}
},
{timestamps: true}
);

export const User = models.User || model('User', userSchema);
