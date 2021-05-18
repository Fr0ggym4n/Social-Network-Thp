import Cookies from 'js-cookie';
import Config from 'config';

const checkAuthentication = () => {
  if (Cookies.get(Config.COOKIE_TOKEN_KEY)) return true;
  return false;
};

const getAuthenticationCookie = () => (Cookies.get(Config.COOKIE_TOKEN_KEY));

const setAuthenticationCookie = (token) => {
  Cookies.set(Config.COOKIE_TOKEN_KEY, token);
};

const removeAuthenticationCookie = () => {
  Cookies.remove(Config.COOKIE_TOKEN_KEY);
};

export {
  checkAuthentication,
  setAuthenticationCookie,
  getAuthenticationCookie,
  removeAuthenticationCookie,
};