import jwt from 'jsonwebtoken';
import {  User} from './models/user';
import { APIError } from '../../rest/modules/api-error';
import { GuildMember } from './models/guild-member';
import { Guild } from './models/guild';
import {connection } from 'mongoose';


  const get = async (id) => {
    const user = await User.findById(id);
    if (!user)
      throw new APIError(404, 'User Not Found');
    return user;
  }

  const getPure = async (id) => {
    const users = connection.db.collection('users');
    const user = await users.findOne({ _id: id });
    if (!user)
      throw  new APIError(404, 'Users Not Found');
    return user;
  }

  const getSelf = async (id) => {
    const user = await User.findById(id);
    if (!user)
      throw new APIError(404, 'User Not Found');
    return user;
  }

  const getByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user)
      throw new APIError(404, 'User Not Found');
    return user;
  }

  const getKnown = async (userId) => {
    const user = await getSelf(userId);
    return await User.find({ _id: { $in: await this.getKnownIds(user) } });
  }
  const getKnownIds = async (user) => {
    const members = await GuildMember.find({ guildId: { $in: user.guildIds } });
    const userIds = members.map(m => m.userId);

    return Array.from(new Set([user.id, ...userIds]));
  }

  const updateById = async (id, partial) => {
    await User.updateOne({ _id: id }, partial);
  }

  const createToken = async (user, expire = true) => {
    return jwt.sign(
      { id: user.id },
      process.env.SSH_KEY,
      { algorithm: 'RS512', expiresIn: (expire) ? '7d' : undefined },
    );
  }
  const idFromBearerToken = async (auth) => {
    const token = auth?.slice('Bearer '.length);
    return await this.verifyToken(token);
  }
  const verifyToken = async (token) => {
    // too insecure to keep in memory
    const key = await readFileAsync('./keys/jwt', { encoding: 'utf-8' });
    const decoded = jwt.verify(token, key, { algorithms: ['RS512'] });
    return decoded?.id;
  }

  const getUserGuilds = async (userId) => {
    const user = await this.getSelf(userId);
    return await Guild.find({ _id: { $in: user.guildIds } });
  }

  const create = async ({ email, username, password }) => {
    ({

      username,
      discriminator: await this.getDiscriminator(username),
      avatarURL: `/avatars/avatar_grey.png`,
      badges: [],
      bot,
      email,
      friends: [],
      status: 'ONLINE',
    }, password);
  }
