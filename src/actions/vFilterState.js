import { V_FILTER_STATE_CHANGE } from '../constants';

const vFilterState = obj => ({
  type: V_FILTER_STATE_CHANGE,
  payload: obj,
});

export default vFilterState;
