import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parseLink } from '../helpers';
import { Comment, CreateHtmlLink, DateToLocale, Fetcher, CommentsData } from '../components';
import { COMMENTS_PREFIX, PREFIX_ISSUE } from '../constants';
import { downloadIssue } from '../actions';
import { IssuePageCss, CommentCss } from '../styles';

class IssuePage extends React.PureComponent {
  render() {
    const {
      loadIssue,
      issue,
      message,
      error,
      pathname,
      } = this.props;
    if (error) {
      return null;
    }
    const loaded = !message && issue;
    const {
      body,
      user,
      created_at: createdAt,
      html_url: htmlUrl,
      comments_url,
      title,
      number,
      state,
     } = loaded;
    const item = loaded && {
      body,
      user,
      created_at: createdAt,
    };
    const commentsUrl = loaded && parseLink(comments_url).pathname;

    const data = loaded ? (<div>
      <h2>
        <CreateHtmlLink
          url={htmlUrl}
          anckhor={`${title} #${number}`}
          title={`open issue #${number} on github`}
        />
      </h2>
      <div className={IssuePageCss.header}>
        {'State: '}
        <h3 className={IssuePageCss[state] || IssuePageCss.default}>
          {state}!
        </h3>
        {' Opened by '}<strong>
          {user && user.login}
        </strong>
        {' '}
        <DateToLocale source={createdAt} lang='en' />
      </div>
      <Comment
        item={item}
        className={CommentCss}
      />
      <CommentsData urlPath={commentsUrl} />
    </div>)
    : null;
    return (
      <div className={IssuePageCss.container}>
        <Fetcher
          prefix={COMMENTS_PREFIX}
          fetchCallback={loadIssue}
          urlPath={pathname}
        />
        {data}
      </div>
    );
  }
}

IssuePage.propTypes = {
  issue: PropTypes.shape({
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,

  }),
  pathname: PropTypes.string.isRequired,
  loadIssue: PropTypes.func.isRequired,
  message: PropTypes.string,
  error: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  issue: state[PREFIX_ISSUE].body,
  message: state[PREFIX_ISSUE].message,
  pathname: ownProps.location.pathname,
});


const mapDispatchToProps = dispatch => ({
  loadIssue: bindActionCreators(downloadIssue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuePage);
