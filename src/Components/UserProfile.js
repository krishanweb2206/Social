import React, { Component } from 'react';
import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';
import { API_URL } from '../helper/url';
import { getAuthTokenFromLocalStorage } from '../helper/util';
import { addFriend, removeFriend } from '../actions/friend';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedusersuccess: null,
      addedusererror: null,
      successMessage: null,
    };
  }
  componentDidMount() {
    const { userId } = this.props;

    if (userId) {
      this.props.dispatch(fetchUserProfile(userId));
    }
  }

  componentDidUpdate(prevProps) {
    const previousId = prevProps.userId;
    const currentId = this.props.userId;

    if (previousId && currentId && previousId !== currentId) {
      this.props.dispatch(fetchUserProfile(currentId));
    }
  }

  checkIfUserIsAFriend = () => {
    const { userId, friends } = this.props;
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleFriendadded = async () => {
    const { userId } = this.props;
    const url = API_URL.addFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        addedusersuccess: true,
        successMessage: 'Added friend successfully',
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        addedusersuccess: null,
        addedusererror: data.message,
      });
    }
  };

  handleRemoveFriend = async () => {
    const { userId } = this.props;
    const url = API_URL.removeFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        addedusersuccess: true,
        successMessage: 'Remove friends successfully',
      });

      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        addedusersuccess: null,
        addedusererror: data.message,
      });
    }
  };
  render() {
    const { profile } = this.props;
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading..!!</h1>;
    }

    const isUserFriend = this.checkIfUserIsAFriend();
    const { addedusererror, addedusersuccess, successMessage } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleFriendadded}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriend}
            >
              Remove Friend
            </button>
          )}

          {addedusersuccess && (
            <div className="alert success-dialog">{successMessage}</div>
          )}
          {addedusererror && (
            <div className="alert error-dialog">{addedusererror}</div>
          )}
        </div>
      </div>
    );
  }
}

function mapToState(state) {
  return {
    profile: state.profile,
    friends: state.friends,
  };
}

export default connect(mapToState)(UserProfile);
