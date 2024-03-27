import { Schema } from 'mongoose';

export const Message =  new Schema({
  authorId: {
    type: String,
  },
  channelId: {
    type: String,
    required: [true, 'Channel ID is required'],
  },
  content: {
    type: String,
    maxlength: [3000, 'Content too long'],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: Date,
})
