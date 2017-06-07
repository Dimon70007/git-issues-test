import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { parseLink } from '../helpers';
import IssueItemCss from '../styles/IssueItem.css';

const IssueItem = (props) => {
  const { number, created_at, title, url } = props.issue;
  const { pathname, query } = parseLink(url);
  const link = { pathname, query };
  const date = new Date(created_at);
  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return (
    <div className={IssueItemCss.container}>
      <Link to={link} >
        <p>#{number} created_at: {date.toLocaleString('en', dateOptions)}</p>
        <p>{title}</p>
      </Link>
    </div>
  );
};

IssueItem.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
};

export default IssueItem;
