import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Router from './router';
import throttle from 'lodash.throttle';
import {bindScroll} from './actions';

const middleware = [ thunk ];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

const router = new Router({store: store});


ReactDOM.render(
  <Provider store={store}>
    <App router={router} />
  </Provider>,
  document.getElementById('root')
);

router.history.start();
bindScroll(store);
