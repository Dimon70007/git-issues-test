import url from 'url';
import querystring from 'querystring';
import { hashHistory } from 'react-router';
import validateForm from './validateForm';
import mergeBody from './mergeBody';

const getAnckhor = (source) => {
  const str = String(source).toLowerCase().trim();
  switch (str) {
    case 'first':
      return '<<';
    case 'prev':
      return '<';
    case 'next':
      return '>';
    case 'last':
      return '>>';
    default:
      return source;
  }
};
const getLink = (rel, pages) => {
  const page = pages && pages[rel];
  if (page) {
    return page.url;
  }
  return '';
};


const pushOptions = (options = {}) => {
  const locationWithOptions = mergeLocation(hashHistory.getCurrentLocation(), options);
  hashHistory.push(locationWithOptions);
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

const createGithubQ = query => querystring(query, '&', '+');

const parseLink = linkUrl => url.parse(linkUrl, true);

export {
  pushOptions,
  getAnckhor,
  createGithubQ,
  mergeLocation,
  validateForm,
  parseLink,
  getLink,
  mergeBody,
  mergeurlQuery,
};
