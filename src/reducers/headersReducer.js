import SET_HEADERS from '../constants';

const initState = {
  per_page: 10,
  page: 1,
};

const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_HEADERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
