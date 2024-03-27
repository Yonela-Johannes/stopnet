import {  Schema } from 'mongoose';

export const GuildMember = new Schema({
  guildId: {
    type: String,
    required: [true, 'Guild ID is required'],
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  roleIds: {
    type: [String],
    default: [],
    required: [true, 'Role IDs is required'],
  },
})
