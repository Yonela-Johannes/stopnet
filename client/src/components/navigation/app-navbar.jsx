// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

const AppNavbar  = () => {
  const dispatch = useDispatch();
  const guild = {}
  const memberListToggled = {}

  const channel = {
    name: "Khayelitsha",
    summary: "This is the actual summary of the channel bro!"
  }
  return (
    <div className="bg-bg-primary shadow-elevation flex items-center h-12 px-5">
      {/* {channel && <FontAwesomeIcon
        color="var(--muted)"
        icon={faHashtag}
        className="scale-150 mr-2" />} */}
      <h3 className="flex-grow ml-1">
        <span className="font-bold">{channel?.name}</span>
        <span className="muted ml-3">{channel?.summary}</span>
      </h3>
      {/* {guild && (
        <FontAwesomeIcon
          onClick={() => dispatch(toggleMemberList())}
          icon={faUserFriends}
          className={classNames(`cursor-pointer`, {
            'heading': memberListToggled,
            'muted': !memberListToggled,
          })} />)} */}
    </div>
  );
}

export default AppNavbar;