import { APIError } from '../modules/api-error';

export default (req, res, next) => {
  const file = req?.file;
  if (!file.mimetype.includes('image'))
    throw new APIError(400, 'Only images can be uploaded at this time');

  return next();
}