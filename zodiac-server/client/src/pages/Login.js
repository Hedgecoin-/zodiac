import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom';
import { withUserContext } from '../context/UserContext';

class Login extends Component {
  handleLogin = () => {
    this.props.login('test', 'test')
      .then(message => {
        this.props.enqueueSnackbar(message);
        console.log(message);
      })
  }

  render() {
    const { user } = this.props;

    if (user.loggedIn && user.username) {
      return <Redirect to='/profile' />
    }

    return (
      <div>
        <h1>Login</h1>
        <input placeholder='Username' />
        <input placeholder='Password' />
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default
  withUserContext(
    withSnackbar(Login));