import { Schema, model, models } from 'mongoose';

const donationSchema = new Schema({
  amount: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User
  username: String, // Store username directly if needed
  date: { type: Date, default: Date.now },
  razorpayPaymentId: String,
});

export const Donation = models.Donation || model('Donation', donationSchema);
