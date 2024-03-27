import {  Schema } from 'mongoose';

export const Channel =  new Schema({
  createdAt: {
    type: Date,
  },
  guildId: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [32, 'Name too long'],
  },
  filterProfanity: { type: Boolean },
  firstMessageId: {
    type: String,
  },
  lastMessageId: {
    type: String,
  },
  summary: {
    type: String,
    maxlength: [128, 'Summary too long'],
  },
  position: {
    type: Number,
    min: [0, 'Position must be greater than 0'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
  },
  overrides: {
    type: [Object],
    default: [],
  },
  userIds: {
    type: [String],
    default: [],
  },
})
