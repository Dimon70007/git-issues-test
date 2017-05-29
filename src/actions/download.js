import { getPath } from '../api';
import { LOAD_ACTIONS, PROMISE } from '../constants';

const loadPath = prefix => (newPath, query) => ({
  type: PROMISE,
  actions: LOAD_ACTIONS.map(item => (`${prefix}${item}`)),
  path: newPath,
  promise: getPath(newPath, query),
});

export default loadPath;
