import download from './download';
import { ISSUES_PREFIX, REPOS_PREFIX, LOAD_ACTIONS, POST_LOAD_ACTIONS } from '../constants';

const downloadIssues = download(ISSUES_PREFIX, LOAD_ACTIONS);
const downloadRepos = download(REPOS_PREFIX, LOAD_ACTIONS);
const postLoadRepos = download(REPOS_PREFIX, POST_LOAD_ACTIONS);

export { downloadIssues, downloadRepos, postLoadRepos };
