import parse from 'parse-link-header';
import { PROMISE /* SET_HEADERS*/ } from '../constants';

const middleware = store => next => (action) => {
  if (action.type !== PROMISE) {
    return next(action);
  }
  const [startAction, successAction, failureAction] = action.actions;
  const newPath = action.path;
  store.dispatch({
    type: startAction,
    path: newPath,
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
    path: newPath,
    payload: {
      body,
      headers,
    },
  }), error => store.dispatch({
    type: failureAction,
    path: newPath,
    error,
  }));
  return next(action);
};
// dispatch снаружи - M1 -> next -> M2 --> .....
export default middleware;
