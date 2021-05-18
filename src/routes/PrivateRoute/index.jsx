import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (routeProps) => {
  const {
    component: Component,
    ...rest
  } = routeProps;
  const currentUser = useSelector((state) => state.info);

  return (
    <Route
      {...rest}
      render={(props) => (
        currentUser.id ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      )}
    />
  );
};

export default PrivateRoute;