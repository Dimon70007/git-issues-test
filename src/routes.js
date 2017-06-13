import React from 'react';
import { Route } from 'react-router';
import path from 'path';
import { PATHNAME_PREFIX } from './constants';
import App from './containers/App';
import IssuesPage from './containers/IssuesPage';
import IssuePage from './containers/IssuePage';

const routes = (
  <Route path={`${PATHNAME_PREFIX}`} component={App}>
    <Route
      // path='/search'
      path={`${path.join(PATHNAME_PREFIX, '/repos/:owner/:repo/issues')}`}
      component={IssuesPage}
    />
    <Route
      path={`${path.join(PATHNAME_PREFIX, '/repos/:owner/:repo/issues/:number')}`}
      component={IssuePage}
    />
  </Route>
);

export default routes;
