import { Schema } from 'mongoose';

const everyoneColor = '#ffffff';

export const Role = new Schema({
  color: {
    type: String,
    default: everyoneColor,
  },
  createdAt: {
    type: Date
  },
  guildId: {
    type: String,
    required: [true, 'Owner ID is required'],
  },
  hoisted: Boolean,
  mentionable: Boolean,
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [32, 'Name too long'],
  },
})
