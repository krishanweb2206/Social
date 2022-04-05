import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.Post, ...state];
    case ADD_COMMENT:
      const newPost = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPost;
    case UPDATE_POST_LIKE:
      const updatePost = state.map((post) => {
        if (post._id === action.postId) {
          if (post.likes.includes(action.userId)) {
            const newLikearray = post.likes.filter(
              (userid) => userid !== action.userId
            );
            return {
              ...post,
              likes: newLikearray,
            };
          }

          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return updatePost;
    default:
      return state;
  }
}
