import AlertModal from '@src/components/modals/AlertModal';
import useModalControl from '@src/hooks/useModalControl';
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface AuthRouteProps extends RouteProps {
  isAuth?: boolean;
  redirectPath?: string;
}

const AuthRoute = ({
  component: Component,
  redirectPath,
  render,
  isAuth = true,
  ...rest
}: AuthRouteProps) => {
  const { isModalVisible: isAlertVisible, hideModal: hideAlert } =
    useModalControl(true);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          render ? (
            render(props)
          ) : (
            Component && <Component {...props} />
          )
        ) : (
          <>
            {isAlertVisible ? (
              <AlertModal
                content={'유효하지 않은 접근입니다.'}
                handleConfirm={hideAlert}
              />
            ) : (
              <Redirect
                to={{ pathname: redirectPath, state: { from: props.location } }}
              />
            )}
          </>
        )
      }
    />
  );
};

export default AuthRoute;
