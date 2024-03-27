import rateLimit from 'express-rate-limit';
import RateLimitStore from 'rate-limit-mongo';

const windowMs = 10 * 60 * 1000;

// additional layer rate limits
export const extraRateLimit = (maxRequestsr) => (req, res, next) => {
  if (process.env.NODE_ENV === 'dev') return next();

  return rateLimit({
    max: maxRequests,
    message: JSON.stringify({ message: 'You are being rate limited' }),
    store: new RateLimitStore({
      uri: process.env.MONGO_URI,
      collectionName: 'extraRateLimits',
      expireTimeMs: windowMs / 2,
    }),
    windowMs: windowMs / 2,
  })(req, res, next);
}

// default layer rate limits
export default (req, res, next) => {
  if (process.env.NODE_ENV === 'dev') return next();

  return rateLimit({
    max: 3000,
    message: JSON.stringify({ message: 'You are being rate limited' }),
    store: new RateLimitStore({
      uri: process.env.MONGO_URI,
      expireTimeMs: windowMs,
    }),
    windowMs,
  })(req, res, next);
}