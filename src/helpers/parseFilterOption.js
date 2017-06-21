
const parseStringValue = (str) => {
  const [property, value] = str.toLowerCase().split(':');
  const strValue = value ? value.replace('_', ' ') : '';
  switch (str) {
    case 'author':
      return (item => item.user.login === strValue || (String(item.user.login).includes(strValue)));
    case 'type:issue':
      return (item => !item.pull_request);
    case 'type:pull_request':
      return (item => !!item.pull_request);
    default:
      return (item => item[property] === strValue || (String(item[property]).includes(strValue)));
  }
};

const parseNumberBigger = (str) => {
  const [property, value] = str.toLowerCase().split('>');
  return (item) => {
    try {
      return Number(item[property]) > Number(value);
    } catch (e) {
      return false;
    }
  };
};

const parseNumberLess = (str) => {
  const [property, value] = str.toLowerCase().split('<');
  return (item) => {
    try {
      const prop = Number(item[property]);
      return prop < Number(value);
    } catch (e) {
      return false;
    }
  };
};

/*
'type:issue',
'type:pull_request',
'state:open',
'state:closed',
'title:part_of_text_throw_lowdash_delimeter',
'number>num',
'number<num',
'author:name_or_partOfName', // user.login
'created_at:YYYY-MM-DDTHH-MM',
 * str: input filter's option as property:value
 * for example is:issue, state:open
 */
const parseFilterOption = (str = '') => {
  const symbols = [':', '<', '>'];
  const mark = symbols.reduce((acc, item) => (str.includes(item) ? item : acc), '');
  // console.log('mark ', mark);
  switch (mark) {
    case '>':
      return parseNumberBigger(str);
    case '<':
      return parseNumberLess(str);
    default:
      return parseStringValue(str);
  }
};


export default parseFilterOption;
