// import parse from 'parse-link-header';
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
  action.promise
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    // console.log('response.headers ', response.headers.get());
    // const Link = response.headers.get('Link');
    // console.log(Link);
    // const parsedLink = parse(Link);
    // console.log(parsedLink);
    // store.dispatch({
    //   type: SET_HEADERS,
    //   payload: parsedLink,
    // });
    return response.json();
  })
  .then(response => store.dispatch({
    type: successAction,
    path: newPath,
    payload: { response },
  }), error => store.dispatch({
    type: failureAction,
    path: newPath,
    error,
  }));
  return next(action);
};
// dispatch снаружи - M1 -> next -> M2 --> .....
export default middleware;
