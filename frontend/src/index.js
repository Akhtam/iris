import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

import configureStore from './store/store';

import jwt_decode from 'jwt-decode';

import { setAuthToken } from './util/sessionApiUtil';

import { logout } from './actions/sessionActions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  const root = document.getElementById('root');

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = localStorage.jwtToken;
    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: jwt_decode(decodedUser),
      },
    };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }

  ReactDOM.render(<Root store={store} />, root);
});
