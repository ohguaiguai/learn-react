import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import store from './store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById('root')
);
