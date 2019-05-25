import React, { Component } from 'react';

const UserContext = React.createContext();


class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: undefined,
        loggedIn: false,
        moderator: false,
      },
      login: (username, password) => {
        return new Promise((resolve, reject) => {
          fetch(`/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            })
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              else {
                reject(res.json());
              }
            })
            .then(data => {
              this.setState({
                user: {
                  username: data.username,
                  loggedIn: true,
                  moderator: data.moderator || false,
                }
              }, resolve(data.message));
            })
        })
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider;

export function withUserContext(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <UserContext.Consumer>
          {context => <WrappedComponent user={context.user} login={context.login} {...this.props} />}
        </UserContext.Consumer>
      )
    }
  }
}