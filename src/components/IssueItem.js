import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import path from 'path';
import IssueItemCss from '../styles/IssueItem.css';

const IssueItem = (props) => {
  const pathname = path.join(props.pathname, String(props.issue.number));
  return (
    <div className={IssueItemCss.container}>
      <Link to={pathname} >
        <h4>{props.issue.title}</h4>
        <p>#{props.issue.number} created_at: {props.issue.created_at}</p>
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
