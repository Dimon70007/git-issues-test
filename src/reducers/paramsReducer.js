import { CHANGE_PARAMS } from '../constants';

const initState = {
  per_page: 10,
  page: 1,
};

const paramsReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_PARAMS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default paramsReducer;
