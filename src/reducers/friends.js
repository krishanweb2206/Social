import {
  FETCH_FRIEND_SUCCESS,
  ADD_FRIEND,
  CLEAR_FRIEND,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

const defaultFriendState = [];

export default function friend(state = defaultFriendState, actions) {
  switch (actions.type) {
    case FETCH_FRIEND_SUCCESS:
      return [...actions.friends];
    case ADD_FRIEND:
      return state.concat(actions.friend);
    case CLEAR_FRIEND:
      return [];
    case REMOVE_FRIEND:
      const newarr = state.filter(
        (friend) => friend.to_user._id !== actions.userId
      );
      return newarr;
    default:
      return state;
  }
}
