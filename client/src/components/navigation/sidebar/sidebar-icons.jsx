import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarIcon from './sidebar-icon';
import { ContextMenuTrigger } from 'react-contextmenu';

const SidebarIcons = () => {
  const user = {}
  const guilds = []

  const guildIcons = guilds?.map(g => (
    <ContextMenuTrigger key={g.id} id={g.id}>
      <div className="context-menu">
        <Link to={`/channels/${g.id}`}>
          <SidebarIcon
            to={`/channels/${g.id}`}
            imageURL={g.iconURL}
            name={g.name}
            tooltip={g.name} />
        </Link>
      </div>
    </ContextMenuTrigger>
  ));

  return (
    <div className="sidebar-icons overflow-auto min-h-screen float-left p-3 flex flex-col bg-bg-tertiary">
      <Link to="/channels/@me">
        <SidebarIcon
          to="/channels/@me"
          imageURL={user.avatarURL}
          name={user.username}
          tooltip="Private Messages" />
      </Link>
      <div className="flex justify-center mb-1">
        <div className="h-0.5 w-8 rounded-sm bg-bg-modifier-accent mb-1" />
      </div>
      {guildIcons}
    </div>
  );
}

export default SidebarIcons;