import { APIError } from '../modules/api-error';

export default (app, prefix) => {
  app.all(`/assets/*`, (req, res, next) => next(new APIError(404)));
  app.all(`/${prefix}/*`, (req, res, next) => next(new APIError(404)));

  app.use(`/`, () => { throw new TypeError('Invalid API version number') });
  
  app.use((error, req, res, next) => {
    if (res.headersSent)
      return next(error);

    const code = error.code || 400;      
    return res
      .status(code)
      .json({ message: error.message });
  });
}