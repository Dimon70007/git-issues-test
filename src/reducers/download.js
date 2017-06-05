import { LOAD_ACTIONS, POST_LOAD_ACTIONS } from '../constants';
import { mergeBody } from '../helpers';

const initState = {
  message: LOAD_ACTIONS[0],
};

const downloadReducer = prefix => (state = initState, action) => {
  const [loading, loaded, loadFailure] =
    LOAD_ACTIONS.map(item => (`${prefix}${item}`));
  const [postLoading, postLoaded, postLoadFailure] =
    POST_LOAD_ACTIONS.map(item => (`${prefix}${item}`));
  const { error, path, query, payload } = action;
  switch (action.type) {
    case loading:
      return {
        message: `${loading}...`,
      };
    case loaded:
      return payload;
    case loadFailure:
      return {
        error,
        path,
        query,
      };
    case postLoaded:
      return {
        body: mergeBody(state.body, payload.body),
        headers: payload.headers,
      };
    case postLoadFailure:
      return {
        ...state,
        error,
        path,
        query,
      };
    case postLoading:
      console.log(postLoading);
      return state;
    default:
      return state;
  }
};

export default downloadReducer;
