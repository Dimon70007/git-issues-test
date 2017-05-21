import fetch from 'isomorphic-fetch';
import path from 'path';

const url = 'https://api.github.com';

const getPath = (newPath) => {
  const normPath = path.join(url, newPath);
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
  return fetch(normPath);
  // .then(responce => console.log('response = ', responce));
};

const postPath = (newPath, data) => Promise.resolve('//todo postPath', data);

export { getPath, postPath };
