// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CircleButton from '../utils/buttons/circle-button';

const Navbar = () => {
  const user = {}

  return (
    <nav className="flex items-center justify-between h-15 p-4 px-8">
      <a className="logo">
        <span className="font-bold heading">Stop</span>
        <span className="muted secondary">net</span>
      </a>
      <div>
        <Link path={user && user?.id ? '/channels/@me' : '/login'}>
          <CircleButton>{user && user?.id ? 'App' : 'Login'}</CircleButton>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;