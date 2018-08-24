import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './app.router';

// Importing Styles
import 'normalize.css';
import './styles/app.scss';

if (module.hot) {
  module.hot.accept();
}

const root = document.getElementById('app');
ReactDOM.render(<AppRouter />, root);
