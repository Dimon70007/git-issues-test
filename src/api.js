import url from 'url';
import mergeurlQuery from './mergeurlQuery';

const githubUrl = 'https://api.github.com';

const getPath = (newPath, query) => {
  const resolved = url.resolve(githubUrl, newPath);
  const urlWithParams = mergeurlQuery(resolved, query);
  return fetch(urlWithParams);
};

const postPath = (newPath, data) => Promise.resolve('//todo postPath', data);

export { getPath, postPath };
