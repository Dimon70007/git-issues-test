import download from './download';
import { ISSUES_PREFIX, REPOS_PREFIX } from '../constants';

const downloadIssues = download(ISSUES_PREFIX);
const downloadRepos = download(REPOS_PREFIX);

export { downloadIssues, downloadRepos };
