import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import CreateLink from './CreateHtmlLink';
import DateToLocale from './DateToLocale';

const Comment = (props) => {
  const { className, item } = props;
  const { body, user } = item;
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
      className={className.container}
    >
      <div className={className.avatar}>
        <CreateLink url={user.html_url} anckhor={avatar} title={user.login} />
      </div>
      <h3>
        <strong>
          <CreateLink url={user.html_url} anckhor={user.login} title={user.login} />
        </strong>
        {' commented '}
        <DateToLocale source={item.created_at} lang='en' />
      </h3>
      <ReactMarkdown source={body} />
    </div>
  );
};

Comment.propTypes = {
  className: PropTypes.object.isRequired,
  item: PropTypes.shape({
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  }),
};

export default Comment;
