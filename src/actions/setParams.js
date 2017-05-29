import { CHANGE_PARAMS } from '../constants';

const setParams = params => ({
  type: CHANGE_PARAMS,
  payload: params,
});

export default setParams;
