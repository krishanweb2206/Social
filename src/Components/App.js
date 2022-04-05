import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { fetchFriend } from '../actions/friend';
import {
  Home,
  NavBar,
  Page404,
  Login,
  Signup,
  Setting,
  UserProfile,
} from './index';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import { authenicateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helper/util';

const PrivateRoute = (privateRouteProps) => {
  const { isloggedIn, Component } = privateRouteProps;
  const { userId } = useParams();
  return isloggedIn ? <Component userId={userId} /> : <Login />;
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(
        authenicateUser({
          name: user.name,
          email: user.email,
          _id: user._id,
        })
      );
      this.props.dispatch(fetchFriend());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      // Using the BrowserRouter (wrap whole app inside the router)
      <Router>
        <div>
          <NavBar />
          {/* Route doesn't allowed to pass any props so use render */}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  posts={posts}
                  isloggedIn={auth.isloggedIn}
                  friends={friends}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Page404 />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute
                  Component={Setting}
                  isloggedIn={auth.isloggedIn}
                />
              }
            />
            <Route
              path="/user/:userId"
              element={
                <PrivateRoute
                  Component={UserProfile}
                  isloggedIn={auth.isloggedIn}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
