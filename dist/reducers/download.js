import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import { LOAD_ACTIONS } from '../constants';

var downloadReducer = function downloadReducer(prefix) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    var _LOAD_ACTIONS$map = LOAD_ACTIONS.map(function (item) {
      return '' + prefix + item;
    }),
        _LOAD_ACTIONS$map2 = _slicedToArray(_LOAD_ACTIONS$map, 3),
        loading = _LOAD_ACTIONS$map2[0],
        loaded = _LOAD_ACTIONS$map2[1],
        loadFailure = _LOAD_ACTIONS$map2[2];
    // console.log(LOAD_ACTIONS);


    switch (action.type) {
      case loading:
        return [{ message: loading + '... ' + action.path }];
      case loaded:
        console.log(action.path, loaded);
        return action.payload;
      case loadFailure:
        console.log(action.error, loadFailure);
        return [{ message: action.error, path: action.path }];
      default:
        return state;
    }
  };
};

export default downloadReducer;
//# sourceMappingURL=/home/otvazhniy/jsProjects/git-issues-test/maps/reducers/download.js.map