import 'babel-polyfill';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

var store = configureStore();
var history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(React.createElement(Root, { store: store, history: history }), document.getElementById('root'));
//# sourceMappingURL=/home/otvazhniy/jsProjects/git-issues-test/maps/index.js.map