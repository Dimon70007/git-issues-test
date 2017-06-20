
export default (items, objectFilter) => {
  const filterKeys = Object.keys(objectFilter);
  return items.filter(item =>
    filterKeys.reduce((predicate, option) => (predicate && objectFilter[option](item)), true));
};
