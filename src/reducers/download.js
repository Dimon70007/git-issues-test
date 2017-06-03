import { LOAD_ACTIONS } from '../constants';

const initState = {
  message: LOAD_ACTIONS[0],
};
const downloadReducer = prefix => (state = initState, action) => {
  const [loading, loaded, loadFailure] =
    LOAD_ACTIONS.map(item => (`${prefix}${item}`));
  switch (action.type) {
    case loading:
      return {
        message: `${loading}...`,
      };
    case loaded:
      return action.payload;
    case loadFailure:
      return {
        error: action.error,
        path: action.path,
      };
    default:
      return state;
  }
};

export default downloadReducer;
