import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { parseLink, getAnckhor } from '../helpers';
import { PagesCss } from '../styles';

const createLink = (pathname, query = {}, page) => {
  const pathnameWithQuery = { pathname, query };
  const anckhor = getAnckhor(page.rel);
  return (
    <Link key={page.rel + query.page} to={pathnameWithQuery} >
      {anckhor}
    </Link>
  );
};

const link = (page = {}, pathname) => {
  if (!page.rel) {
    return null;
  }
  const { query } = parseLink(page.url);
  return createLink(pathname, query, page);
};
// todo any links with number after first page

const Pages = ({ pages = {}, pathname = '' }) => {
  const generateLinks = (
    { first = {}, next = {}, prev = {}, last = {} },
    left = [], right = []) => {
    if (!next.page && !prev.page && !last.page) {
      return null;
    }
    const step = 1;
    const maxLinksCount = 6;
    const { query } = parseLink(last.url || prev.url);
    // min <...>...prevP ... nextP...<...> max
    const min = first.page ? Number(first.page) : Number(next.page) - 1;
    const prevP = prev.page ? Number(prev.page) : min;
    const max = last.page ? Number(last.page) : Number(prev.page) + 1;
    const nextP = next.page ? Number(next.page) : max;

    const prevPrev = prevP - step;
    const nextNext = nextP + step;

    const hasMaxLinksCount = (left.length + right.length) >= maxLinksCount;
    const notEnaughPages = prevPrev <= min && nextNext >= max;

    if (hasMaxLinksCount || notEnaughPages) {
      const delimeter = (left.length && right.length) ? '...' : '';
      return { left, delimeter, right };
    }
    const prevPage = {};
    const nextPage = {};
    if (prevPrev > min) {
      left.unshift(createLink(
        pathname,
        { ...query, page: prevPrev },
      { rel: prevPrev }));
      prevPage.page = prevPrev;
      prevPage.rel = prevPrev;
    } else {
      prevPage.page = min;
      prevPage.rel = prev.rel;
    }
    prevPage.url = prev.url;

    if (nextNext < max) {
      right.push(createLink(
        pathname,
        { ...query, page: nextNext },
        { rel: nextNext }));
      nextPage.page = nextNext;
      nextPage.rel = nextNext;
    } else {
      nextPage.page = max;
      nextPage.rel = next.rel;
    }
    nextPage.url = next.url;
    return generateLinks({ first, next: nextPage, prev: prevPage, last }, [...left], [...right]);
  };

  if (!pages) {
    return null;
  }
  const { left, delimeter, right } = generateLinks(pages) || {};
  const { first, prev, next, last } = pages;

  return (<div className={PagesCss.container}>
    {link(first, pathname)}
    {left}
    {link(prev, pathname)}
    {delimeter}
    {link(next, pathname)}
    {right}
    {link(last, pathname)}
  </div>);
};

const page = PropTypes.shape({
  rel: PropTypes.string,
  page: PropTypes.string,
  url: PropTypes.string,
});

Pages.propTypes = {
  pages: PropTypes.shape({
    next: page,
    prev: page,
    first: page,
    last: page,
  }),
  pathname: PropTypes.string,
};

export default Pages;
