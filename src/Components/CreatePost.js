import React, { Component } from 'react';
import { createPost } from '../actions/posts';
import { connect } from 'react-redux';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  handleonClick = () => {
    this.props.dispatch(createPost(this.state.content));
    this.setState({
      content: '',
    });
  };

  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <div>
          <button id="add-post-btn" onClick={this.handleonClick}>
            ADD POST
          </button>
        </div>
      </div>
    );
  }
}

// we can write connect()(component_name) when we need only dispatch
export default connect()(CreatePost);
