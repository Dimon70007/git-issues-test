/*
 * str: input filter's option as property:value
 * for example is:issue, state:open
 */
const parseFilterOption = (str) => {
  const [property, value] = str.toLowerCase().split(':');
  // case /comments<.+/:
  //   return item => item.comments < less;
  // case /comments>.+/:
  //   return item => item.comments > bigger;
  // const [, bigger] = str.split('>');
  // const [, less] = str.split('<');
  switch (str) {
    case 'type:issue':
      return (item => !item.pull_request);
    case 'type:pull_request':
      return (item => !!item.pull_request);
    default:
      return (item => item[property] === value || (String(item[property]).includes(value)));
  }
};

export default parseFilterOption;
