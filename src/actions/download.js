import { getPath } from '../api';
import { PROMISE } from '../constants';

const loadPath = (prefix, actions) => {
  let oldPath = '';
  let oldQuery = {};
  return (newPath, newQuery) => {
    if (oldPath !== newPath || oldQuery !== newQuery) {
      oldPath = newPath;
      oldQuery = newQuery;
      console.log('newPath ', newPath);
      console.log('newQuery ', newQuery);
      return {
        type: PROMISE,
        actions: actions.map(item => (`${prefix}${item}`)),
        path: newPath,
        query: newQuery,
        promise: getPath(newPath, newQuery),
      };
    }
    return { type: 'NOTHING_TO_FETCH' };
  };
};

export default loadPath;
