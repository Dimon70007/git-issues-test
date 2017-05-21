import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notificationsReducer } from 'reapop';
// import counterReducer from './counter';
import downloadReducer from './download';
// import repoReducer from './repo';
import { ISSUE_PREFIX } from '../constants';

const reducer = combineReducers({
  routing: routerReducer, // => state.routing
  notifications: notificationsReducer(),
  // repo: repoReducer, // => state.repo
  // counter: counterReducer, // => state.counter
  issues: downloadReducer(ISSUE_PREFIX), // => state.issues
});

export default reducer;
