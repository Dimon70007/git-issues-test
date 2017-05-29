// import fetch from 'isomorphic-fetch';
// import path from 'path';
import url from 'url';
import mergeurlQuery from './mergeurlQuery';

const githubUrl = 'https://api.github.com';

const getPath = (newPath, query) => {
  const resolved = url.resolve(githubUrl, newPath);
  const urlWithParams = mergeurlQuery(resolved, query);
  console.log('getting urlWithParams ', urlWithParams);
  return fetch(urlWithParams);
};

const postPath = (newPath, data) => Promise.resolve('//todo postPath', data);

export { getPath, postPath };

// return new Promise((resolve) => {
//   setTimeout(() => {
//     resolve([{
//       created_at: Date.now().toString(),
//       id: 454373,
//       number: 70007,
//     }]);
//   }, 4000);
//   throw new Error();
// }, (reject) => {
//   setTimeout(() => {
//     reject([{
//       message: 'Not found',
//     }]);
//   }, 4000);
// });
