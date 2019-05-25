import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import UserProvider from './context/UserContext';

import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <UserProvider>
          <App />
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </BrowserRouter>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
