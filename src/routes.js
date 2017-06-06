import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import IssuesPage from './containers/IssuesPage';

const routes = (
  <Route path='/' component={App}>
    <Route
      path='/repos/:owner/:repo/issues'
      component={IssuesPage}
    />
    {/* <Route path='/:owner/:repo/issues/:number'
    component={Issue} /> */}
  </Route>
);

export default routes;
