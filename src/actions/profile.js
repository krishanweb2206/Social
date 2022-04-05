import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILED,
  USER_PROFILE_FETCH,
} from '../actions/actionTypes';
import { API_URL } from '../helper/url';
import { getAuthTokenFromLocalStorage } from '../helper/util';

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILED,
    error,
  };
}

export function startUserProfileFetch() {
  return {
    type: USER_PROFILE_FETCH,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = API_URL.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
          return;
        }
        dispatch(userProfileFailure('Unable to fetch the user detail'));
      });
  };
}
