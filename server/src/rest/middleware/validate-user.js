import { APIError } from '../modules/api-error';

export default async (req, res, next) => {  
  if (res.locals.user)
    return next();
  throw new APIError(401, 'User not logged in');
}