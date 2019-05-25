import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

const UserContext = React.createContext();

class UserProvider extends Component {

  constructor(props) {
    super(props);
    const { cookies } = props;

    let userDetails = cookies.get('user') || {
      userId: undefined,
      username: undefined,
      loggedIn: false,
      moderator: false,
    };

    if (userDetails && userDetails.userId && userDetails.username) {
      console.log(`Logged in as [${userDetails.userId}] ${userDetails.username}`);
    }

    this.state = {
      user: userDetails,
      players: [],
      getRankings: () => {
        return new Promise((resolve, reject) => {
          fetch('/player/all')
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              else {
                reject(res.json());
              }
            })
            .then(data => this.setState({ players: data }, resolve(data)))
            .catch(err => console.log(err));
        });
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
              const { cookies } = this.props;
              let loggedInUser = {
                userId: data.userId,
                username: data.username,
                loggedIn: true,
                moderator: data.moderator || false,
              }
              console.log(`Logged in as [${loggedInUser.userId}] ${loggedInUser.username}`);
              cookies.set('user', loggedInUser, { path: '/' });
              this.setState({ user: loggedInUser }, resolve(data.message));
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

export default withCookies(UserProvider);

export function withUserContext(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <UserContext.Consumer>
          {context => <WrappedComponent
            {...context}
            {...this.props} />}
        </UserContext.Consumer>
      )
    }
  }
}