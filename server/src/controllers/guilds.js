import { Guild } from '../models/guild';
import { User } from '../models/user';
import { APIError } from '../../rest/modules/api-error';
import { Channel } from '../models/channel';
import { Role } from '../models/role';
import { GuildMember } from '../models/guild-member';

  const get = async (id) => {
    const guild = await Guild.findById(id);
    if (!guild)
      throw new APIError(404, 'Guild not found');
    return guild;
  }

  const getFromChannel = async (id) => {
    return await Guild.findOne({ channels: { $in: id } });
  }

  const create = async (options) => {
    const guildId = options.id;

    const [_, systemChannel, __] = await Promise.all([
      deps.roles.create(guildId, { name: '@everyone' }),
      deps.channels.createText(guildId),
      deps.channels.createVoice(guildId),
    ]);
    const [guild, ___] = await Promise.all([
      Guild.create({
        _id: guildId,
        name: 'Unnamed Guild',
        ownerId: options.ownerId,
        systemChannelId: systemChannel.id,
        ...options,
      }),
      deps.guildMembers.create({ guildId, userId: options.ownerId }),
    ]);

    return guild;
  }

  const getChannels = async (guildId) => {
    return await Channel.find({ guildId });
  }

  const getMembers = async (guildId) => {
    return await GuildMember.find({ guildId });
  }

  const getRoles = async (guildId) => {
    return await Role.find({ guildId });
  }
  const getUsers = async (guildId) => {
    const users = await User.find({ guildIds: guildId });
    return users.map(u => deps.users.secure(u));
  }

  const getEntities = async (guildId) => {
    const [channels, members, roles, users] = await Promise.all([
      this.getChannels(guildId),
      this.getMembers(guildId),
      this.getRoles(guildId),
      this.getUsers(guildId),
    ]);
    return { channels, members, roles, users };
  }
