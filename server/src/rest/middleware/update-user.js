export default async (req, res, next) => {
  try {
    const token = req.get('Authorization');    
    const id = await deps.users.idFromBearerToken(token);    

    res.locals.user = await deps.users.getSelf(id);
  } finally {
    return next();
  }
}