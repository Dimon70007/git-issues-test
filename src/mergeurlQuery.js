import url from 'url';

export default (urlPath, params) => {
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
