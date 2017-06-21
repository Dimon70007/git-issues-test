import download from './download';
import { PREFIX_ISSUE, ISSUES_PREFIX, REPOS_PREFIX, LOAD_ACTIONS, POST_LOAD_ACTIONS, COMMENTS_PREFIX } from '../constants';
import clearError from './clearError';
import vFilter from './vFilter';
import vFilterState from './vFilterState';

const downloadIssues = download(ISSUES_PREFIX, LOAD_ACTIONS);
const postLoadIssues = download(ISSUES_PREFIX, POST_LOAD_ACTIONS);
const downloadIssue = download(PREFIX_ISSUE, LOAD_ACTIONS);
const downloadRepos = download(REPOS_PREFIX, LOAD_ACTIONS);
const downloadAny = prefix => download(prefix, LOAD_ACTIONS);
const downloadComments = download(COMMENTS_PREFIX, LOAD_ACTIONS);
const postLoadRepos = download(REPOS_PREFIX, POST_LOAD_ACTIONS);
const postLoadComments = download(COMMENTS_PREFIX, POST_LOAD_ACTIONS);
const postLoadAny = prefix => download(prefix, POST_LOAD_ACTIONS);
const changeFilter = vFilter;

export {
  vFilterState,
  changeFilter,
  postLoadComments,
  downloadComments,
  postLoadAny,
  downloadAny,
  clearError,
  downloadIssue,
  downloadIssues,
  postLoadIssues,
  downloadRepos,
  postLoadRepos,
};
