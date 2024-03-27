import { Schema } from 'mongoose';

export const Guild = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [32, 'Name is too long'],
  },
  createdAt: { type: Date},
  iconURL: String,
  ownerId: {
    type: String,
    required: true,
  },
  systemChannelId: {
    type: String,
  },
})