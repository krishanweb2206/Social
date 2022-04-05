import { FETCH_SEARCH_RESULT_SUCCESS } from '../actions/actionTypes';
import { API_URL } from '../helper/url';
import { getAuthTokenFromLocalStorage } from '../helper/util';

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = API_URL.userSearch(searchText);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(searchResultSuccess(data.data.users));
        } else {
          dispatch(searchResultSuccess([]));
        }
      });
  };
}
export function searchResultSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULT_SUCCESS,
    users,
  };
}
