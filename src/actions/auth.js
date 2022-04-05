import {
  Login_Start,
  Login_Failed,
  Login_Success,
  SignUp_Failed,
  SignUp_Start,
  SignUp_Success,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
} from './actionTypes';
import { API_URL } from '../helper/url';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helper/util';
import { fetchFriend } from '../actions/friend';

export function startLogin() {
  return {
    type: Login_Start,
  };
}

export function loginfailed(errorMessage) {
  return {
    type: Login_Failed,
    error: errorMessage,
  };
}

export function loginsuccess(user) {
  return {
    type: Login_Success,
    user: user,
  };
}

// action send the req to server
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = API_URL.login();
    fetch(url, {
      method: 'POST',
      // basically API url are return a data in proper format i.e urlformencoded
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', //server accept a request to with this content type only
      },
      //   body: /login?email=a@gmail.com&password=12345 so email and password create into url-encoded string
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sign in data : ', data);
        if (data.success) {
          // dispatch loginsuccess and save user
          localStorage.setItem('token', data.data.token);
          dispatch(loginsuccess(data.data.user));
          // fetching the fetchfriend for display all the friends after login
          dispatch(fetchFriend());
          return;
        }
        dispatch(loginfailed(data.message));
      });
  };
}

export function signupStart() {
  return {
    type: SignUp_Start,
  };
}

export function signupFailed(errorMessage) {
  return {
    type: SignUp_Failed,
    error: errorMessage,
  };
}

export function signupSuccess(user) {
  return {
    type: SignUp_Success,
    user: user,
  };
}

export function signup(name, email, password, confirmpassword) {
  return (dispatch) => {
    dispatch(signupStart());
    const url = API_URL.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        name,
        email,
        password,
        confirm_password: confirmpassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('SignUp data is : ', data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccess(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

// Store the user

export function authenicateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user: user,
  };
}

export function logout() {
  return {
    type: LOG_OUT,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUserSuccess(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user: user,
  };
}

export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error: error,
  };
}

export function editUser(name, password, confirmpassword, userId) {
  return (dispatch) => {
    const url = API_URL.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmpassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(editUserSuccess(data.data.user));
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }

        dispatch(editUserFailed(data.message));
      });
  };
}
