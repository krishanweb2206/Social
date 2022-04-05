import React, { Component } from 'react';
import { PostList, FriendList } from './';
import Chat from './Chat';

class Home extends Component {
  render() {
    const { posts, isloggedIn, friends } = this.props;
    return (
      <div className="home">
        <PostList posts={posts} />
        {isloggedIn && <FriendList friends={friends} />}
        {isloggedIn && <Chat />}
      </div>
    );
  }
}

export default Home;
