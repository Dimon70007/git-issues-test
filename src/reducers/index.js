import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import downloadReducer from './download';
import errorsReducer from './errorsReducer';
import vFilterReducer from './vFilterReducer';
import vFilterState from './vFilterState';
import { ISSUES_PREFIX, REPOS_PREFIX, PREFIX_ISSUE, COMMENTS_PREFIX, VISIBILITY_FILTER, V_FILTER_STATE } from '../constants';

const reducer = combineReducers({
  routing: routerReducer, // => state.routing
  form: formReducer, // => state.form
  notifications: notificationsReducer(), // => state.notifications
  error: errorsReducer, // => state.error
  [VISIBILITY_FILTER]: vFilterReducer,
  [V_FILTER_STATE]: vFilterState,
  [ISSUES_PREFIX]: downloadReducer(ISSUES_PREFIX), // => state.ISSUES_PREFIX
  [REPOS_PREFIX]: downloadReducer(REPOS_PREFIX), // => state.REPOS_PREFIX
  [PREFIX_ISSUE]: downloadReducer(PREFIX_ISSUE), // => state.PREFIX_ISSUE
  [COMMENTS_PREFIX]: downloadReducer(COMMENTS_PREFIX),
});

export default reducer;
