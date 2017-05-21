import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
// import Issue from './containers/Issue';
import IssuesPage from './containers/IssuesPage';

export default (
  <Route path='/' component={App}>
    <Route
      path='/repos/:owner/:repo/issues'
      component={IssuesPage}
    />
    {/* <Route path='/:owner/:repo/issues/:number'
    component={Issue} /> */}
  </Route>
);
