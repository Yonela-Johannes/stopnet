import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export const Username = (props) =>
  (props.user)
    ? FoundUsername(props)
    : FoundUsername({
      ...props,
      user: {
        id: '0',
        username: 'Unknown User',
        discriminator: 0,
      },
    });

const FoundUsername = ({ guild, user, className, size = 'md' }) => {
  const userOwnsGuild = (guild?.ownerId === user.id);
  const discrim = user?.discriminator?.toString()?.padStart(4, '0');
  const isOnline = (user?.status === 'ONLINE');

  const UserPresence = () => {
    const blob = {
      color: (isOnline) ? 'bg-success' : 'bg-gray-500',
      size: {
        'lg': 'h-6 w-6',
        'md': 'h-3.5 w-3.5',
        'sm': 'h-2 w-2',
      }[size],
    };

    return (
      <span className="rounded-full absolute inline-flex -right-0.5 -bottom-0.5">
        <span
          style={{ border: '2px solid var(--bg-secondary)' }}
          className={classNames(
            `relative inline-flex rounded-full px-1`,
            blob?.size, blob?.color, { 'hidden': size === 'sm' })} />
      </span>
    );
  }

  const sizeClass = {
    'lg': 'text-lg',
    'md': 'text-sm',
    'sm': 'text-sm',
  }[size];

  return (
    <div className={classNames(
      className,
      `inline-flex items-center px-2`,
      'cursor-pointer',
      { 'opacity-50': (!isOnline) })}>
      <div className="relative avatar mr-2">
        <UserPresence />
        {/* <Image
          className={{
            'sm': 'select-none rounded-full w-6 h-6',
            'md': `select-none rounded-full w-8 h-8`,
            'lg': `select-none rounded-full w-20 h-20`,
          }[size]}
          src={`${process.env.REACT_APP_CDN_URL}${user.avatarURL}`} /> */}
      </div>
      <div className="tag leading-4">
        <h4 className={classNames({ 'font-bold': size !== 'sm' }, sizeClass)}>
          <span
            className={classNames({ 'font-light text-base': guild })}>{user.username}</span>
          <span className="text-yellow-400 ml-1">
            {(userOwnsGuild && size !== 'sm') && <FontAwesomeIcon icon={faCrown} />}
          </span>
        </h4>
        {(!guild && size !== 'sm') &&
          <div className={classNames(`discriminator`, sizeClass)}>#{discrim}</div>}
      </div>
    </div>
  );
}

export default Username;