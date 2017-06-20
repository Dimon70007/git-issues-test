const vFilter = action => filterString => ({
  type: action,
  payload: filterString.split(' '),
});

export default vFilter;
