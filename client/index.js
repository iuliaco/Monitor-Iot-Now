import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import  App from './components/App.js';
import  Intro  from './components/Intro.jsx';
import  Routes  from './routes';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  console.log(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  console.log(decoded);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/about';
  }
}


ReactDOM.render(
    <Provider store = { store }>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
    , document.getElementById('root'));



