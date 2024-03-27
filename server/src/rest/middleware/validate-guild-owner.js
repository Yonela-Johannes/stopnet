import { APIError } from '../modules/api-error';

export default async (req, res, next) => {
  const userOwnsGuild = res.locals.guild.ownerId === res.locals.user.id;
  if (userOwnsGuild)
    return next();
  throw new APIError(401, 'You do not own this guild!');
}