import errorMessages from 'utils/errorUtils';
import { setAuthenticationCookie } from 'utils/cookieUtils';
import { REGISTER } from 'api/apiHandler';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from 'store/user/userActions';
import { Redirect } from 'react-router-dom';
import slugify from 'utils/slugify';
import RegisterForm from './RegisterForm';
import './style.scss';

const Register = () => {
  const globalState = useSelector((state) => state);
  const { info: currentUser, loading, error } = globalState;
  const registerDispatch = useDispatch();

  const fetchRegister = ({ username, email, password }) => async (dispatch) => {
    dispatch(fetchUserRequest());

    const registerData = {
      username,
      email,
      password,
      slug: slugify(username),
    };

    const {
      URL,
      METHOD,
      HEADERS,
      BODY,
    } = REGISTER(registerData);

    const response = await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
      body: BODY,
    });

    const data = await response.json();

    if (data.error) {
      dispatch(fetchUserFailure(errorMessages(data)));
    } else {
      const user = {
        id: data.user.id,
        username: data.user.username,
      };

      setAuthenticationCookie(data.jwt);
      dispatch(fetchUserSuccess(user));
    }
  };

  const handleRegistration = (userData) => {
    registerDispatch(fetchRegister(userData));
  };

  return (
    <div className="Register">
      <h1>Sign up</h1>
      {loading && (
        <p>SENDING REQUEST, PLEASE WAIT…</p>
      )}
      {error && (
        <p>{error}</p>
      )}
      {currentUser.id && (
        <Redirect to={{ pathname: '/profile' }} />
      )}
      <RegisterForm handleRegistration={handleRegistration} />
    </div>
  );
};

export default Register;