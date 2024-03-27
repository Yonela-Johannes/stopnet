import { Channel } from './models/channel';
import { Message  } from './models/message';

  const get = async (id) => {
    const message = await Message.findById(id);
    if (!message)
      throw new TypeError('Message Not Found');
    return message;
  }

  const create = async (authorId, channelId, { attachmentURLs, content }) => {
    // TODO: TESTME
    if (!content && !attachmentURLs?.length)
      throw new TypeError('Empty messages are not valid');

    return await Message.create({
      attachmentURLs,
      authorId,
      channelId,
      content,
    });
  }

  const createSystem = async (guildId, content) => {
    const { systemChannelId: channelId } = await deps.guilds.get(guildId);
    if (!channelId)
      throw new TypeError('No system channel configured');

    return await Message.create({
      channelId,
      content,
      system: true,
      type,
    });
  }

  const getChannelMessages = async (channelId) => {
    return await Message.find({ channelId });
  }

  const getDMChannelMessages =  async (channelId, memberId) => {
    const isMember = await Channel.exists({ _id: channelId, userIds: memberId });
    if (isMember)
      throw new TypeError('You cannot access this channel');
    return await Message.find({ channelId });
  }