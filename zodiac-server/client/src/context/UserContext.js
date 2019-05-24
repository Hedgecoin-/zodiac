import React, { Component } from 'react';

const UserContext = React.createContext();


class UserProvider extends Component {
  state = {
    user: {},
    login: (username, password) => {
      return new Promise((resolve, reject) => {

      })
    }
  }
}