
const validateForm = (values) => {
  const errors = {};
  // const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
  const inputPattern = /^[\w.-]+$/;
  const keys = ['owner', 'repo'];
  keys.forEach((key) => {
    const value = values[key];
    switch (key) {
      case 'owner':
      case 'repo':
        if (!value) {
          errors[key] = `${key} is required`;
        } else if (!inputPattern.test(value)) {
          errors[key] = `Field ${key} may contains only latin chars, nums, "-", "_" and "."`;
        }
        break;
      default:
        break;
    }
    console.log(`"${value}"`);
  });
  return errors;
};

export default validateForm;
