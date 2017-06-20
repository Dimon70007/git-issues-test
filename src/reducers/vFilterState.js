import { V_FILTER_STATE_CHANGE, V_FILTER_ACTIONS } from '../constants';

const initState = {
  textFieldValue: 'type:issue state:open',
  filterHelperKey: '',
  filterHelperValue: [],
};

const vFilterState = (state = initState, action) => {
  const { payload, type } = action;
  const [, clearFilter, dropdownFilter] = V_FILTER_ACTIONS;

  switch (type) {
    case V_FILTER_STATE_CHANGE:
      return {
        ...state,
        ...payload,
      };
    case clearFilter:
      return {
        ...initState,
        textFieldValue: '',
      };
    case dropdownFilter:
      return initState;
    default:
      return state;
  }
};

export default vFilterState;
