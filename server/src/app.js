import { connect } from 'mongoose';
import { config } from 'dotenv';
config();

import { parse } from 'yaml';
import fs from 'fs';
global['config'] = parse(fs.readFileSync('../config.yaml', 'utf-8'));

import './modules/logger';
import './modules/deps';
import { User } from './models/user';

connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 0,
}).catch(error => log.error(error.message || 'Unable to connect to db', { uri: process.env.MONGO_URI }))
  .then(async () => {
    log.info(`Connected to database.`, { uri: process.env.MONGO_URI });
    await User.updateMany({ $set: { status: 'OFFLINE' } })
  });