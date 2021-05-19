import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogOut } from 'store/user/userActions';
import { removeAuthenticationCookie } from 'utils/cookieUtils';
import './style.scss';

const Header = () => {
  const currentUser = useSelector((state) => (state.info));
  const { username } = currentUser;
  const dispatch = useDispatch();

  const handleLogOut = () => {
    removeAuthenticationCookie();
    dispatch(userLogOut());
  };

  return (
    <div className="Header">
      <Link to="/" className="Header__title">Twitter-Like Network</Link>
      {!username && (
        <div className="Header__public">
          <Link to="/login" className="Header__public__link">Log in</Link>
          <Link to="/register" className="Header__public__link">Sign up</Link>
        </div>
      )}
      {username && (
        <div className="Header__loggedIn">
          <Link to="/profile" className="Header__LoggedIn__profile">Profile</Link>
          <button type="button" className="Header__loggedIn__logOut" onClick={handleLogOut}>Log out, {username}</button>
        </div>
      )}
    </div>
  );
};

export default Header;