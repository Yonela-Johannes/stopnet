import { PermissionTypes } from '@acrd/types';
import { hasPermission, Role } from './models/role';

  const get = async (id) => {
    const role = await Role.findById(id);
    if (!role)
      throw new TypeError('Role Not Found');
    return role;
  }

  const getEveryone = async (guildId) => {
    return await Role.findOne({ guildId, name: '@everyone' });
  }

  const memberIsHigher = async (guild, selfMember, theirRoleIds = []) => {
    const [myRoles, theirRoles] = await Promise.all([
      Role.find({ _id: { $in: selfMember.roleIds } }),
      Role.find({ _id: { $in: theirRoleIds } }),
    ]);
    const max = (key) => (max, val) => (max[key] > val[key]) ? max : val;
    const myHighestRole = myRoles.reduce(max('position'));
    const theirHighestRole = theirRoles.reduce(max('position'));

    const selfIsOwner = selfMember.userId === guild.ownerId;
    const selfHasHigherRole = myHighestRole.position > theirHighestRole.position;

    return selfIsOwner || selfHasHigherRole;
  }

  const hasPermission = async (guild, member, permission) => {
    const guildRoles = await Role.find({ guildId: guild.id });
    const totalPerms = guildRoles
      .filter(r => member.roleIds.includes(r.id))
      .reduce((acc, value) => value.permissions | acc, 0);

    const permNumber = (typeof permission === 'string')
      ? PermissionTypes.All[PermissionTypes.All[permission]]
      : permission;
    return hasPermission(totalPerms, +permNumber);
  }

  const create = async (guildId, options) => {
    Role.create({
      guildId,
      mentionable: false,
      hoisted: false,
      name: 'New Role',
      permissions: PermissionTypes.defaultPermissions,
      position: await Role.countDocuments({ guildId }),
      ...options,
    });
  }

  const update = async (id, options) => {
    return Role.updateOne({ _id: id }, options, { runValidators: true });
  }
