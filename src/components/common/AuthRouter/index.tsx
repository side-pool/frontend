import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useGetUser } from '@src/hooks/useUserQuery';

const AuthRoute = ({ component: Component, render, ...rest }: RouteProps) => {
  const { isError } = useGetUser();

  if (!Component) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !isError ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
