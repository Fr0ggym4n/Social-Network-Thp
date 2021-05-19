import { OWN_PROFILE } from 'api/apiHandler';
import Header from 'components/Header';
import Home from 'pages/Home';
import Login from 'pages/Login';
import OtherProfile from 'pages/OtherProfile';
import Profile from 'pages/Profile';
import Register from 'pages/Register';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';
import { editUser } from 'store/user/userActions';
import 'style.scss';
import { checkAuthentication, getAuthenticationCookie } from 'utils/cookieUtils';

const App = () => {
  const dispatch = useDispatch();

  const fetchCurrentUserFromCookie = async () => {
    const token = getAuthenticationCookie();

    const {
      URL,
      METHOD,
      HEADERS,
    } = OWN_PROFILE(token);

    const response = await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
    });

    const data = await response.json();

    const { id, username } = data;

    const user = { id, username };

    dispatch(editUser(user));
  };

  useEffect(() => {
    if (checkAuthentication()) fetchCurrentUserFromCookie();
  }, );

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/user" component={OtherProfile} />
          <Route>
            😱 WOops… The page was not found! 😱
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;