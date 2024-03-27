import { Application } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import cors from 'cors';
import { User } from '../../models/user';
import rateLimiter, { extraRateLimit } from '../modules/rate-limiter';
import multer from 'multer';
import { extname, resolve } from 'path';
import crypto from 'crypto';
import { promisify } from 'util';
import { readFile, rename } from 'fs';
import validateUser from '../middleware/validate-user';
import updateUser from '../middleware/update-user';
import { execSync } from 'child_process';
import expressSession from 'express-session';

const renameAsync = promisify(rename);
const readFileAsync = promisify(readFile);

function setupMulter(app) {
  const uploadDir = resolve('./assets/upload');
  try {
    execSync(`mkdir -p ${uploadDir} 2>> /dev/null`);
  } catch {
    log.error("Upload folder not created. Refer to the setup guide.");
  }

  // uses storage rather than memory - 2 file operations per file upload
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + extname(file.originalname)),
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
      const fileSize = parseInt(req.headers['content-length']);
      if (fileSize > 1024 * 1024)
        return callback(new Error('File size must be less than 1MB'));

      callback(null, true);
    },
    limits: { fileSize: 1024 * 1024 }
  });

  app.post('/v2/upload', updateUser, validateUser, extraRateLimit(10), upload.single('file'), async (req, res) => {
    const file = req.file;

    const buffer = await readFileAsync(file.path);
    const hash = crypto
      .createHash('md5')
      .update(buffer)
      .digest('hex');

    const newFileName = hash + extname(file.originalname);
    await renameAsync(file.path, `${uploadDir}/${newFileName}`);
    log.silly(`Uploaded ${newFileName}`);

    const url = `/upload/${newFileName}`;
    res.status(201).json({ hash, url });
  });
}

function setupPassport(app) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    User.authenticate(),
  ));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

export default (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  app.use(rateLimiter);

  setupPassport(app);
  setupMulter(app);
}