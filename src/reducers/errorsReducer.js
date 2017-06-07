import { LOAD_ACTIONS, CLEAR_ERROR } from '../constants';

const initState = {};

const errorsReducer = (state = initState, action) => {
  const { error, path, query, type } = action;
  const failureAction = LOAD_ACTIONS[2];
  if (type.includes(failureAction)) {
    return {
      message: error.message,
      path,
      query,
      shouldDisplay: true,
    };
  }
  if (type === CLEAR_ERROR) {
    return {};
  }
  return state;
};

export default errorsReducer;
