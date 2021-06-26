import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './services/firebase'
import './styles/globals.scss'

ReactDOM.render(
  <React.StrictMode>
    {console.log(process.env.REACT_APP_AUTH_DOMAIN)}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
