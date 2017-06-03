import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import path from 'path';
import IssueItemCss from '../styles/IssueItem.css';

const IssueItem = (props) => {
  const pathname = path.join(props.pathname, String(props.issue.number));
  const date = new Date(props.issue.created_at);
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
      <Link to={pathname} >
        <p>#{props.issue.number} created_at: {date.toLocaleString('en', dateOptions)}</p>
        <p>{props.issue.title}</p>
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
  pathname: PropTypes.string.isRequired,
};

export default IssueItem;
