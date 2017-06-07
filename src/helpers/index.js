import url from 'url';
import validateForm from './validateForm';
import mergeBody from './mergeBody';

const getLink = (rel, pages) => {
  const page = pages && pages[rel];
  if (page) {
    return page.url;
  }
  return '';
};

const mergeLocation = (location = {}, options = {}) => {
  const pathname = options.pathname || location.pathname;
  const query = options.query ? { ...location.query, ...options.query } : location.query;
  const newLocation = { ...location, pathname, query };
  return newLocation;
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
  mergeLocation,
  validateForm,
  parseLink,
  getLink,
  mergeBody,
  mergeurlQuery,
};
