import { GuildMember } from '../models/guild-member';
import { Role } from '../models/role';
import { User } from '../models/user';

  const get = async (id) => {
    const member = await GuildMember.findById(id);
    if (!member)
      throw new TypeError('Guild member not found');
    return member;
  }

  const getInGuild = async (guildId, userId) => {
    const member = await GuildMember.findOne({ guildId, userId });
    if (!member)
      throw new TypeError('Guild member not found');
    return member;
  }

  const create = async (options) => {
    const member = await GuildMember.create({
      roleIds: [await getEveryoneRoleId(options.guildId)],
      ...options,
    });
    await addGuildToUser(options.userId, options.guildId);
    return member;
  }

  const addGuildToUser = async (userId, guildId) => {
    await User.updateOne({ _id: userId }, { $push: { guildIds: guildId } });
  }

  const getEveryoneRoleId = async (guildId) => {
    const role = await Role.findOne({ guildId, name: '@everyone' });
    return role?.id;
  }

  const update = async (memberId, options) => {
    return await GuildMember.updateOne(
      { _id: memberId },
      options,
      { runValidators: true },
    );
  }