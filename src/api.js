import url from 'url';
import mergeurlQuery from './mergeurlQuery';

const githubUrl = 'https://api.github.com';

const getPath = (newPath = '', query = {}) => {
  const resolved = url.resolve(githubUrl, newPath);
  // Object.entries(query).forEach(([key, value]) => resolved.searchParams.append(key, value));
  // console.log('resolved ', resolved);
  const urlWithParams = mergeurlQuery(resolved, query);
  console.log('urlWithParams ', urlWithParams);
  return fetch(urlWithParams);
};

const postPath = (newPath, data) => Promise.resolve('//todo postPath', data);

export { getPath, postPath };
