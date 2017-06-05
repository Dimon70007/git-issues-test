import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';

var Root = function Root(_ref) {
  var history = _ref.history,
      store = _ref.store;
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(Router, { history: history, routes: routes })
  );
};
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
//# sourceMappingURL=/home/otvazhniy/jsProjects/git-issues-test/maps/containers/Root.js.map