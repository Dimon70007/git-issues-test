/*
 * obj -  plain object for reducer
 * func - function(acc, objectKey, objectValue)
 * acc - anything that will be put in func to accumulate result
 */
const objectReduce = (obj, func, acc) => {
  const entries = Object.entries(obj);
  return entries.length ?
    entries.reduce((accum, [key, value]) => func(accum, key, value), acc) :
    acc;
};

export default objectReduce;
