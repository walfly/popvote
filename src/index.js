import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import api from './api/cnnApi.js';

api().then(json => {
    ReactDOM.render(
      <App r={json.candidates[0]} d={json.candidates[1]} ts={json.wfLastUpdated}/>,
      document.getElementById('root')
    );
});

