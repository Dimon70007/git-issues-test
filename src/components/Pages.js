import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { parseLink } from '../mergeurlQuery';
import { PagesCss } from '../styles';

const link = (page = {}, pathname) => {
  if (!page.rel) {
    return null;
  }
  const { query } = parseLink(page.url);
  const pathnameWithQuery = { pathname, query };
  console.log('pathnameWithQuery', pathnameWithQuery);
  console.log('page.rel', page.rel);
  return (
    <Link to={pathnameWithQuery} disabled={!!page.rel}>
      {page.rel.toUpperCase()}
    </Link>
  );
};

const Pages = ({ pages = { first: {}, prev: {}, next: {}, last: {} }, pathname }) =>
  (<div className={PagesCss.container}>
    {link(pages.first, pathname)}
    {link(pages.prev, pathname)}
    {link(pages.next, pathname)}
    {link(pages.last, pathname)}
  </div>
);

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
