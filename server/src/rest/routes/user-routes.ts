import { REST, UserTypes } from '@acrd/types';
import { Router } from 'express';
import { User } from '../../models/user';
import generateInvite from '../../utils/generate-invite';
import { Guild } from '../../models/guild';
import { Role } from '../../models/role';
import { GuildMember } from '../../models/guild-member';
import { Channel } from '../../models/channel';
import updateUser from '../middleware/update-user';
import validateUser from '../middleware/validate-user';
import { Theme } from '../../models/theme';

export const router = Router();

router.get('/', updateUser, validateUser, async (req, res) => {
  const knownUsers = await deps.users.getKnown(res.locals.user.id);
  res.json(knownUsers);
});

router.get('/count', async (req, res) => {
  const count = await User.countDocuments();
  res.json(count);
});

router.get('/check-username', async (req, res) => {
  const username = req.query.value?.toString().toLowerCase();
  const exists = await User.exists({
    username: { $regex: new RegExp(`^${username}$`, 'i') },
  });
  res.json(exists);
});

router.get('/check-email', async (req, res) => {
  const email = req.query.value?.toString().toLowerCase();
  const exists = await User.exists({
    email: { $regex: new RegExp(`^${email}$`, 'i') },
    verified: true,
  });
  res.json(exists);
});

router.get('/self', updateUser, validateUser, async (req, res) => res.json(res.locals.user));

router.get('/entities', updateUser, validateUser, async (req, res) => {
  const guildIds: string[] = req.params.guildIds as any;
  const user: UserTypes.Self = res.locals.user;
  const $in = user.guildIds.concat(guildIds);

  const [channels, guilds, members, roles, themes, unsecureUsers] = await Promise.all([
    Channel.find({ guildId: { $in } }),
    Guild.find({ _id: { $in } }),
    GuildMember.find({ guildId: { $in } }),
    Role.find({ guildId: { $in } }),
    Theme.find({ _id: { $in: user.unlockedThemeIds } }),
    User.find({ guildIds: { $in } })
  ]);

  const secureUsers = unsecureUsers.map((u: any) => deps.users.secure(u));

  res.json({
    channels,
    guilds,
    members,
    roles,
    themes,
    users: secureUsers
  } as REST.From.Get['/users/entities']);
});

router.get('/:id', async (req, res) => {
  const user = await deps.users.get(req.params.id);
  res.json(user);
});
