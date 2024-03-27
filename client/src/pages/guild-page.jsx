// import { useDispatch, useSelector } from 'react-redux';
import AppNavbar from '../components/navigation/app-navbar';
import Sidebar from '../components/navigation/sidebar/sidebar';
import { useParams } from 'react-router-dom';
// import { actions as uiActions } from '../../store/ui';
// import TextBasedChannel from '../components/channel/text-based-channel';
// import MemberList from '../user/member-list';
// import { getGuild, getGuildChannels } from '../../store/guilds';
import { useEffect } from 'react';
import PageWrapper from './page-wrapper';
// import { getChannel } from '../../store/channels';

const GuildPage = () => {  
  // const { channelId, guildId } = useParams();
  // const dispatch = useDispatch();
  // const ui = useSelector((s) => s.ui);
  // const guild = useSelector(getGuild(guildId));
  // const channel = useSelector(getChannel(channelId));
  // const textChannels = useSelector(getGuildChannels(guildId)).filter(c => c.type === 'TEXT');

  // useEffect(() => {
  //   // dispatch(uiActions.pageSwitched({ channel, guild }));
  // }, [guild, channel]);

  // if (!guild) 
  //   return <Redirect to="/channels/@me" />;
  // else if (textChannels.length && !channelId) {
  //   const systemChannel = textChannels[0];
  //   return <Redirect to={`/channels/${guild.id}/${systemChannel.id}`} />;
  // }  

  return (
    <PageWrapper pageTitle="
    text">
    {/* <PageWrapper pageTitle={channel?.name ?? guild.name}> */}
      <Sidebar />

{/* 
      {(channel)
        ? <div className="bg-bg-primary">
            <AppNavbar />
            <div
              style={{ height: 'calc(100vh - 48px)' }}
              className="flex">
              {ui.activeChannel && {
                'TEXT': <TextBasedChannel />,
              }[channel.type]}
              <MemberList />
            </div>
          </div>
        : <div className="bg-bg-tertiary" />} 
      
      */}

    </PageWrapper>
  )
}
 
export default GuildPage;