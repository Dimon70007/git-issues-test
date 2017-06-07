import { LOAD_ACTIONS, POST_LOAD_ACTIONS } from '../constants';
import { mergeBody } from '../helpers';

const initState = {
  message: LOAD_ACTIONS[0],
};

const downloadReducer = prefix => (state = initState, action) => {
  const { payload, type } = action;
  const [loading, loaded] =
    LOAD_ACTIONS.map(item => (`${prefix}${item}`));
  const [, postLoaded] =
    POST_LOAD_ACTIONS.map(item => (`${prefix}${item}`));
  switch (type) {
    case loading:
      return {
        message: `${loading}...`,
      };
    case loaded:
      return payload;
    case postLoaded:
      return {
        body: mergeBody(state.body, payload.body),
        headers: payload.headers,
      };
    default:
      return state;
  }
};

export default downloadReducer;
