import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import IssuesPage from './containers/IssuesPage';
import IssuePage from './containers/IssuePage';

const routes = (
  <Route path='/' component={App}>
    <Route
      path='/repos/:owner/:repo/issues'
      component={IssuesPage}
    />
    <Route
      path='/repos/:owner/:repo/issues/:number'
      component={IssuePage}
    />
  </Route>
);

export default routes;
