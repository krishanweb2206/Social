import { API_URL } from '../helper/url';
import {
  FETCH_FRIEND_SUCCESS,
  ADD_FRIEND,
  CLEAR_FRIEND,
  REMOVE_FRIEND,
} from '../actions/actionTypes';
import { getAuthTokenFromLocalStorage } from '../helper/util';

export function friendSuccess(friends) {
  return {
    type: FETCH_FRIEND_SUCCESS,
    friends: friends,
  };
}

export function fetchFriend() {
  return (dispatch) => {
    const url = API_URL.userFriend();
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('friend is : ', data);
        dispatch(friendSuccess(data.data.friends));
      });
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function clearFriendlist() {
  return {
    type: CLEAR_FRIEND,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
