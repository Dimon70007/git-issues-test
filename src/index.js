import 'babel-polyfill';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);
