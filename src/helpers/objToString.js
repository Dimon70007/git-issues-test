import objectReduce from './objectReduce';

export default (obj) => {
  const fToString = (acc, key, value) => (acc ? `${acc} ${key}:${value}` : `${key}:${value}`);
  return objectReduce(obj, fToString, '');
};
