import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { clearFriendlist } from '../actions/friend';
import { searchUsers } from '../actions/search';

class NavBar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(clearFriendlist());
    this.props.dispatch(logout());
  };

  handleSearch = (event) => {
    const searchText = event.target.value;
    this.props.dispatch(searchUsers(searchText));
  };
  render() {
    const { auth, results } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
            alt="search-icon"
          />
          <input placeholder="Search" onChange={this.handleSearch} />

          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((user) => {
                  return (
                    <Link to={`/user/${user._id}`}>
                      <li className="search-results-row" key={user._id}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                          alt="user-dp"
                        />
                        <span>{user.name}</span>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          {auth.isloggedIn && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}
          <div className="nav-links">
            <ul>
              {!auth.isloggedIn && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}

              {auth.isloggedIn && <li onClick={this.logOut}>Signout</li>}

              {!auth.isloggedIn && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapToState(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}

export default connect(mapToState)(NavBar);
