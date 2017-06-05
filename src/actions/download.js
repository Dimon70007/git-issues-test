import { getPath } from '../api';
import { LOAD_ACTIONS, PROMISE } from '../constants';

const loadPath = (prefix) => {
  let oldPath = '';
  let oldQuery = {};
  return (newPath, newQuery) => {
    if (oldPath !== newPath || oldQuery !== newQuery) {
      oldPath = newPath;
      oldQuery = newQuery;
      return {
        type: PROMISE,
        actions: LOAD_ACTIONS.map(item => (`${prefix}${item}`)),
        path: newPath,
        query: newQuery,
        promise: getPath(newPath, newQuery),
      };
    }
    return { type: 'NOTHING_TO_FETCH' };
  };
};

export default loadPath;
