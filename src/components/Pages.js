import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { parseLink, getAnckhor } from '../helpers';
import { PagesCss } from '../styles';

const createLink = ({ pathname = '', query = {} }, page) => {
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
  return createLink({ pathname, query }, page);
};
// todo any links with number after first page

const Pages = ({ pages = {}, pathname = '' }) => {
  const generateLinks = (
    { first = {}, next = {}, prev = {}, last = {} },
    left = [], right = []) => {
    if (!next.page && !prev.page && !last.page) {
      return null;
    }
    const { query } = parseLink(last.url || prev.url);
    const step = 1;
    // min <...>...prevP currentP nextP...<...> max
    const prevP = prev.page ? Number(prev.page) : Number(first.page);
    const nextP = next.page ? Number(next.page) : Number(last.page);
    const max = last.page ? Number(last.page) : Number(prev.page) + 1;
    const min = 1;
    if ((left.length + right.length) >= 6) {
      const delimeter = (left.length && right.length) ? '...' : '';
      return [...left, delimeter, ...right];
    }
    const prevPage = {};
    const nextPage = {};
    const prevPrev = prevP - step;
    if (prevPrev > min) {
      left.unshift(createLink({
        pathname,
        query: { ...query, page: prevPrev },
      }, { rel: prevPrev }));
      prevPage.page = prevPrev;
      prevPage.rel = prevPrev;
    } else {
      prevPage.page = prev.page;
      prevPage.rel = prev.rel;
    }
    prevPage.url = prev.url;

    const nextNext = nextP + step;
    if (nextNext < max) {
      right.push(createLink({
        pathname,
        query: { ...query, page: nextNext },
      }, { rel: nextNext }));
      nextPage.page = nextNext;
      nextPage.rel = nextNext;
    } else {
      nextPage.page = next.page;
      nextPage.rel = next.rel;
    }
    nextPage.url = next.url;
    // const nextNum = Number(nextP.page) + 1
    // const nextPage = { page: , }
    return generateLinks({ first, next: nextPage, prev: prevPage, last }, [...left], [...right]);
  };

  if (!pages) {
    return null;
  }
  const { first, prev, next, last } = pages;

  const links = generateLinks(pages);
  return (<div className={PagesCss.container}>
    {link(first, pathname)}
    {link(prev, pathname)}
    {links}
    {link(next, pathname)}
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
