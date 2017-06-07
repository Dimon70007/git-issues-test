import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import downloadReducer from './download';
import errorsReducer from './errorsReducer';
import { ISSUES_PREFIX, REPOS_PREFIX, PREFIX_ISSUE } from '../constants';

const reducer = combineReducers({
  routing: routerReducer, // => state.routing
  form: formReducer, // => state.form
  notifications: notificationsReducer(), // => state.notifications
  issues: downloadReducer(ISSUES_PREFIX), // => state.issues
  repos: downloadReducer(REPOS_PREFIX), // => state.repos
  issue: downloadReducer(PREFIX_ISSUE), // => state.issue
  error: errorsReducer, // => state.error
});

export default reducer;
