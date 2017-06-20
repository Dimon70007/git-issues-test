import { V_FILTER_ACTIONS } from '../constants';
import { parseFilterOption } from '../helpers';

const typeIssue = item => !item.pull_request;
const stateOpen = item => item.state === 'open';
const initState = [typeIssue, stateOpen];

const vFilterReducer = (state = initState, action) => {
  const { payload, type } = action;
  const [applyFilter, clearFilter, dropdownFilter] = V_FILTER_ACTIONS;
  switch (type) {
    case applyFilter:
      return Array.isArray(payload) && payload.map(str => parseFilterOption(str));
    case clearFilter:
      return [];
    case dropdownFilter:
      return initState;
    default:
      return state;
  }
};

export default vFilterReducer;
