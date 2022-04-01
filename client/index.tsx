import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './core.scss';

if(module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'));