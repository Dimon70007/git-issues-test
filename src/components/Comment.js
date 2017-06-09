import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
// import path from 'path';
// import { parseLink } from '../helpers';
const createLink = (url, anckhor, title = '') => (
  <a href={url} target='_blank' rel='noopener noreferrer' title={title}>
    {anckhor}
  </a>
);

const Comment = (props) => {
  console.log('props ', props);
  const { className, item } = props;
  const { created_at, body, user } = item;
  // const { pathname, query } = parseLink(user.url);
  // const linkPath = { pathname, query };
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
  const avatar = (
    <img
      src={user.avatar_url}
      width='40'
      height='50'
      alt='avatar'
    />
  );
  return (
    <div
      className={className}
      // data-src={user.avatar_url}
      // alt='avatar'
      // Target='_blank'
    >
      {createLink(user.html_url, avatar, user.login)}
      <h6>
        {createLink(user.html_url, user.login, user.login)}
        commented {date.toLocaleString('en', dateOptions)}
      </h6>
      <p>{body}</p>
    </div>
  );
};

Comment.propTypes = {
  className: PropTypes.object.isRequired,
  item: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  }),
  // pathname: PropTypes.string.isRequired,
};

export default Comment;
