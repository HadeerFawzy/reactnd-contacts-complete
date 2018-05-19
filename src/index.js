import React from 'react';
import ReactDOM from 'react-dom';
// browser router listen to the changes in the url
// when those changes happen it will make sure that the right screen shows up
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);
registerServiceWorker();
