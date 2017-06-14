const LOAD_ACTIONS = [
  '_LOADING',
  '_LOADED',
  '_LOAD_FAILURE',
];
const POST_LOAD_ACTIONS = [
  '_POST_LOADING',
  '_POST_LOADED',
  '_POST_LOAD_FAILURE',
];
const PROMISE = 'PROMISE';
const POST_LOAD_PROMISE = 'POST_LOAD_PROMISE';
const ISSUES_PREFIX = 'ISSUES';
const REPOS_PREFIX = 'REPOS';
const PREFIX_ISSUE = 'ISSUE';
const COMMENTS_PREFIX = 'COMMENTS';
const VALIDATE_FORM = 'VALIDATE_FORM';
const SET_HEADERS = 'SET_HEADERS';
const CHANGE_PARAMS = 'CHANGE_PARAMS';
const PER_PAGE_LIST = [10, 30, 45, 60, 75, 100];
const CLEAR_ERROR = 'CLEAR_ERROR';
const PATHNAME_PREFIX = '/'; // process.env.PUBLIC_URL; // '/git-issues-test/';

// console.log('PATHNAME_PREFIX ', PATHNAME_PREFIX);

export {
  PATHNAME_PREFIX,
  CLEAR_ERROR,
  POST_LOAD_PROMISE,
  POST_LOAD_ACTIONS,
  PER_PAGE_LIST,
  CHANGE_PARAMS,
  SET_HEADERS,
  LOAD_ACTIONS,
  PROMISE,
  COMMENTS_PREFIX,
  ISSUES_PREFIX,
  REPOS_PREFIX,
  PREFIX_ISSUE,
  VALIDATE_FORM,
};
