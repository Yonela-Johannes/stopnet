import {  Schema } from 'mongoose';

export const User = new Schema({
  activeThemeId: String,
  avatarURL: {
    type: String,
    required: [true, 'Avatar URL is required'],
  },
  badges: {
    type: [String],
    default: [],
  },
  bot: Boolean,
  createdAt: {
    type: Date,
  },
  email: {
    type: String,
    unique: [true, 'Email is already in use'],
    dropDups: true,
    uniqueCaseInsensitive: true,
  },
  guildIds: {
    type: [String],
  },
  lastReadMessages: {
    type: Object,
    default: {},
  },
  locked: Boolean,
  premium: Boolean,
  premiumExpiration: Date,
  status: {
    type: String,
    required: [true, 'Status is required'],
    default: 'OFFLINE',
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  verified: Boolean,
})