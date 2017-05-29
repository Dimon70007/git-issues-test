import { SET_HEADERS } from '../constants';

const setHeaders = settings => ({
  type: SET_HEADERS,
  payload: settings,
});

export default setHeaders;
