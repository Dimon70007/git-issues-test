import { CHANGE_PARAMS } from '../constants';

console.log('CHANGE_PARAMS', CHANGE_PARAMS);

const initState = {
  per_page: 10,
  page: 1,
};

const paramsReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_PARAMS:
      console.log('state ', state);
      console.log('action.payload', action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default paramsReducer;
