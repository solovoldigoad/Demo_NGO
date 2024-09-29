import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
  text: string;
  date: Date;
}

const messageSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,  // Default to current date if not provided
  },
});

// Export the model so it can be used in other files
export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);
