import './sidebar-icon.scoped.css';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const SidebarIcon = (props) => {
  let { to, imageURL, name, childClasses = 'bg-bg-primary font', disableHoverEffect } = props;
  const location = useLocation();
  if (imageURL)
    imageURL = ``;

  const getAbbr = (name) => name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 3);

  const isActive = (to && location.pathname.startsWith(to));
  const activeClasses = (isActive)
    ? 'rounded-xl bg-primary'
    : 'rounded-full';

  return (
    <>
      <div data-tip
        data-for={name + 'GuildTooltip'}
        className={classNames('wrapper sidebar-icon', { 'active': isActive })}>
        <div className={classNames({
          'selected rounded absolute bg-white -left-1 h-0 w-2': !disableHoverEffect,
          'hidden': disableHoverEffect,
        })} />
        <div className={classNames(
          `cursor-pointer guild-icon flex justify-center mb-2`,
          activeClasses,
          childClasses,
        )}></div>
      </div>
      <ReactTooltip
        id={name + 'GuildTooltip'}
        backgroundColor='var(--bg-primary)'
        effect='solid'
        place='right'>
        {props.tooltip}
      </ReactTooltip>
    </>
  );
}

export default SidebarIcon;