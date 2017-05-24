
const validateForm = (values) => {
  const errors = {};
  // const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
  const inputPattern = /^[\w.-]+$/;
  const keys = Object.keys(values);
  keys.forEach((key) => {
    // if (!values[key]) {
    //   errors[key] = `Field ${key} should not be an empty`;
    // }
    switch (key) {
      case 'owner':
      case 'repo':
        if (!inputPattern.test(values[key])) {
          errors[key] = `Field ${key} may contains chars only: <A-Z a-z 0-9 - _ .>.`;
        }
        //  else {
        //   errors[key] = 'Required';
        // }
        break;
      default:
        break;
    }
  });
  return errors;
};

export default validateForm;
