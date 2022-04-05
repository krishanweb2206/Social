import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, clearAuthState } from '../actions/auth';
import { Navigate } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (name && email && password && confirmPassword) {
      this.props.dispatch(signup(name, email, password, confirmPassword));
    }
  };

  render() {
    const { error, inProgress, isloggedIn } = this.props.auth;
    if (isloggedIn) {
      return <Navigate to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(event) => this.handleInput('name', event.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(event) => this.handleInput('email', event.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(event) =>
              this.handleInput('password', event.target.value)
            }
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(event) =>
              this.handleInput('confirmPassword', event.target.value)
            }
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit} disabled={inProgress}>
            Register
          </button>
        </div>
      </form>
    );
  }
}

function mapToState(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapToState)(Signup);
