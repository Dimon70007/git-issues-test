import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';

const Root = ({ history, store }) => (
  <Provider store={store}>
    <div>
      <Router history={history} />
      {routes}
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
