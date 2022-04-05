import {
  Login_Failed,
  Login_Start,
  Login_Success,
  SignUp_Failed,
  SignUp_Start,
  SignUp_Success,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
} from '../actions/actionTypes';

const initialState = {
  user: {},
  error: null,
  isloggedIn: false,
  inProgress: false,
};

export default function auth(state = initialState, actions) {
  switch (actions.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case Login_Start:
    case SignUp_Start:
      return {
        ...state,
        inProgress: true,
      };
    case Login_Success:
    case SignUp_Success:
      return {
        ...state,
        isloggedIn: true,
        inProgress: false,
        error: null,
        user: actions.user,
      };
    case Login_Failed:
    case SignUp_Failed:
      return {
        ...state,
        inProgress: false,
        error: actions.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: actions.user,
        isloggedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isloggedIn: false,
      };
    case EDIT_USER_SUCCESSFUL:
      return {
        ...state,
        user: actions.user,
        error: false,
      };
    case EDIT_USER_FAILED: {
      return {
        ...state,
        error: actions.error,
      };
    }
    default:
      return state;
  }
}
