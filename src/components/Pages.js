import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { parseLink } from '../helpers';
import { PagesCss } from '../styles';

const link = (page = {}, pathname) => {
  if (!page.rel) {
    return null;
  }
  const { query } = parseLink(page.url);
  const pathnameWithQuery = { pathname, query };
  return (
    <Link to={pathnameWithQuery} >
      {page.rel.toUpperCase()}
    </Link>
  );
};
// todo any links with number after first page
// const generateLinks = function *(prev = {}, last = {}) => {
//   if (last.rel) {
//
//   }
//
// };

const Pages = ({ pages, pathname }) => {
  if (!pages) {
    return null;
  }
  const { first, prev, next, last } = pages;

  // const links = generateLinks(prev, last);
  return (<div className={PagesCss.container}>
    {link(first, pathname)}
    {link(prev, pathname)}
    {/* {links} */}
    {link(next, pathname)}
    {link(last, pathname)}
  </div>);
};

const page = PropTypes.shape({
  rel: PropTypes.string,
  url: PropTypes.string,
});

Pages.propTypes = {
  pages: PropTypes.shape({
    next: page,
    prev: page,
    first: page,
    last: page,
  }),
  pathname: PropTypes.string.isRequired,
};

export default Pages;
