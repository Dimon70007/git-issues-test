import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import path from 'path';

const Comment = (props) => {
  const { pathname, className, item } = props;
  const { number, created_at, title } = item;
  const linkPath = path.join(pathname, String(number));
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
  console.log();
  return (
    <div className={className}>
      <Link to={linkPath} >
        <p>#{number} created_at: {date.toLocaleString('en', dateOptions)}</p>
        <p>{title}</p>
      </Link>
    </div>
  );
};

Comment.propTypes = {
  className: PropTypes.object.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
  pathname: PropTypes.string.isRequired,
};

export default Comment;
