import parse from 'parse-link-header';
import { PROMISE } from '../constants';

const middleware = store => next => (action) => {
  if (action.type !== PROMISE) {
    return next(action);
  }
  const [startAction, successAction, failureAction] = action.actions;
  const { path, query } = action;
  store.dispatch({
    type: startAction,
    path,
    query,
  });
  const headers = {};
  action.promise
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    const Link = response.headers.get('link');
    const parsedLink = parse(Link);
    headers.Link = parsedLink;
    return response.json();
  })
  .then(body => store.dispatch({
    type: successAction,
    path,
    query,
    payload: {
      body,
      headers,
    },
  }), error => store.dispatch({
    type: failureAction,
    path,
    query,
    error,
  }));
  return next(action);
};
// dispatch снаружи - M1 -> next -> M2 --> .....
export default middleware;
