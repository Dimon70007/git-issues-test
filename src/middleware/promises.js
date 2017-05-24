import { PROMISE } from '../constants';

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
  action.promise
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    // console.log('response.headers ', response.headers.get());
    return response.json();
  })
  .then(payload => store.dispatch({
    type: successAction,
    path: newPath,
    payload,
  }), error => store.dispatch({
    type: failureAction,
    path: newPath,
    error,
  }));
  return next(action);
};
// dispatch снаружи - M1 -> next -> M2 --> .....
export default middleware;
