import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import downloadReducer from './download';
import { ISSUES_PREFIX, PREFIX_ISSUE } from '../constants';

const reducer = combineReducers({
  routing: routerReducer, // => state.routing
  form: formReducer, // => state.form
  notifications: notificationsReducer(), // => state.notifications
  issues: downloadReducer(ISSUES_PREFIX), // => state.issues
  issue: downloadReducer(PREFIX_ISSUE), // => state.issue
});

export default reducer;
