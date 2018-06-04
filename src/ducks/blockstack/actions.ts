import { Dispatch } from 'redux';
import { ReduxState } from 'ducks';
import { redirectToSignIn, handlePendingSignIn, signUserOut } from 'blockstack';
import { TypeKeys, BlockstackAction, User } from './types';

export function login() {
  redirectToSignIn();
  return {
    type: TypeKeys.LOGIN
  };
}

export function handleLogin() {
  return function (dispatch: Dispatch<BlockstackAction, ReduxState>) {
    dispatch({ type: TypeKeys.HANDLE_LOGIN });

    handlePendingSignIn()
      .then((user: User) => {
        dispatch({
          type: TypeKeys.HANDLE_LOGIN_SUCCESS,
          payload: user,
        });
      })
      .catch((err) => {
        dispatch({
          type: TypeKeys.HANDLE_LOGIN_FAILURE,
          payload: err,
        })
      });
  }
}

export function logout() {
  signUserOut();
  return {
    type: TypeKeys.LOGOUT
  };
}
