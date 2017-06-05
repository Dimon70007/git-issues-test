import url from 'url';
import validateForm from './validateForm';

const getLink = (rel, pages = {}) => {
  const page = pages[rel];
  if (page) {
    return page.url;
  }
  return '';
};

const mergeBody = (oldBody, newBody) => {
  if (Array.isArray(oldBody)) {
    return [...oldBody, ...newBody];
  }
  const items = oldBody.items;
  if (items) {
    const newItems = newBody.items;
    return {
      ...newBody,
      items: [...items, ...newItems],
    };
  }
  return oldBody;
};

const mergeurlQuery = (urlPath, params) => {
  const urlObj = url.parse(urlPath, true);
  const mergedQuery = { ...urlObj.query, ...params };
  const query = Object.entries(mergedQuery)
    .filter(([, value]) => (value !== null && value !== undefined))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }), {});
  return url.format({ ...urlObj, query, search: null });
};

const parseLink = linkUrl => url.parse(linkUrl, true);

export {
  validateForm,
  parseLink,
  getLink,
  mergeBody,
  mergeurlQuery,
};
