import React, { JSXElementConstructor } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useGetUser } from '@src/hooks/useUserQuery';

interface AuthRouteProps extends RouteProps {
  component: JSXElementConstructor<any>;
}

const AuthRoute = ({
  component: Component,
  render,
  ...rest
}: AuthRouteProps) => {
  const { isSuccess, isLoading } = useGetUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading || isSuccess ? (
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
