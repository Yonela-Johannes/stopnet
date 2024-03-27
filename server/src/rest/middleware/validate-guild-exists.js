import { Guild } from '../../data/models/guild';

export default async (req, res, next) => {
  const exists = await Guild.exists({ _id: req.params.id });
  return (exists)
    ? next()
    : res.status(404).json({ message: 'Guild does not exist' });
}