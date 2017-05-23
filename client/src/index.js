import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import AppState from './stores/AppState';

const appState = new AppState();

ReactDOM.render(
    <App store={appState}/>,
  document.getElementById('root')
);