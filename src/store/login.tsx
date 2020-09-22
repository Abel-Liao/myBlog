import { createActions, handleActions, combineActions } from "redux-actions";

const loginState = { isLogin: false };

export const change = createActions({
  CHANGELOGIN: (todo) => ({ todo }),
});

export const login = handleActions(
  {
    CHANGELOGIN: (state: any, action: any) => {
      return Object.assign({}, state, { isLogin: action.text });
    },
  },
  loginState
);
