import React, { Component } from 'react';
import { Header, Input, Button } from 'semantic-ui-react';

class Login extends Component {
  handleLogin = () => {
    fetch(`/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "test",
        password: "test",
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        console.log(data);
      })
  }

  render() {
    return (
      <div>
        <Header as='h1'>Login</Header>
        <Input placeholder='Username' />
        <Input placeholder='Password' />
        <Button onClick={this.handleLogin}>Login</Button>
      </div>
    );
  }
}

export default Login;