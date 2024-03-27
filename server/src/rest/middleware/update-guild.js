export default async (req, res, next) => {
  res.locals.guild = await deps.guilds.get(req.params.id);  
  return next();
}