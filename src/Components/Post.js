import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from './';
import { connect } from 'react-redux';
import { addLike, createComment } from '../actions/posts';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  handleCommentOnChnge = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };

  handleAddComment = (event) => {
    const { post } = this.props;
    const { comment } = this.state;

    if (event.key === 'Enter') {
      // dispatch an action
      this.props.dispatch(createComment(comment, post._id));
      this.setState({
        comment: '',
      });
    }
  };

  handlePostLike = () => {
    const { post } = this.props;
    const user = this.props.auth.user;
    this.props.dispatch(addLike(post._id, 'Post', user._id));
  };
  render() {
    const { post } = this.props;
    const user = this.props.auth.user;
    const { comment } = this.state;
    const isPostLikedByUser = post.likes.includes(user._id);

    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                alt="user-pic"
              />
            </Link>
            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">a minute ago</span>
            </div>
          </div>

          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostLikedByUser ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2107/2107774.png"
                  alt="likes-icon"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2107/2107952.png"
                  alt="likes-icon"
                />
              )}
              <span>{post.likes.length}</span>
            </button>

            <div className="post-comments-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4081/4081342.png"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>

          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment.."
              onChange={this.handleCommentOnChnge}
              onKeyPress={this.handleAddComment}
              value={comment}
            />
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} postId={post._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Post);
