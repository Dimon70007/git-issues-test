import download from './download';
import { PREFIX_ISSUE, ISSUES_PREFIX, REPOS_PREFIX, LOAD_ACTIONS, POST_LOAD_ACTIONS } from '../constants';
import clearError from './clearError';

const downloadIssues = download(ISSUES_PREFIX, LOAD_ACTIONS);
const downloadIssue = download(PREFIX_ISSUE, LOAD_ACTIONS);
const downloadRepos = download(REPOS_PREFIX, LOAD_ACTIONS);
const postLoadRepos = download(REPOS_PREFIX, POST_LOAD_ACTIONS);

export { clearError, downloadIssue, downloadIssues, downloadRepos, postLoadRepos };
