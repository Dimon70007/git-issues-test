import { VALIDATE_FORM } from '../constants';

const initState = {};

const validateForm = (state = initState, action) => {
  switch (action.type) {
    case VALIDATE_FORM:
      return action.payload;
    default:
      return state;
  }
};

export default validateForm;
