import FoundUsername from '../../user/username.jsx';
import { useDispatch } from 'react-redux';

const SidebarFooter = () => {
  const dispatch = useDispatch();
  const user = {}

  return (
    <div className="bg-bg-secondary-alt">
      <div className="relative flex items-center py-2">
        <div className="select-all">
          <FoundUsername user={user} />
        </div>
      </div>
    </div>
  );
}

export default SidebarFooter;