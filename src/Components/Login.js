import React, { Component } from 'react';
import { clearAuthState, login } from '../actions/auth';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    // Uncontrolled React Component so initialise the reference and change into controlled componet
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleEmailInput = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordInput = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(this.emailInputRef);
    // console.log(this.passwordInputRef);
    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    // console.log('login props is : ', this.props);

    const { error, inProgress, isloggedIn } = this.props.auth;

    if (isloggedIn) {
      return <Navigate to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailInput}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordInput}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging....
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
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
export default connect(mapToState)(Login);
