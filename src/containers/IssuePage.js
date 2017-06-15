import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import { Pages, List, Comment, CreateHtmlLink, DateToLocale } from '../components';
import Fetcher from '../components/Fetcher';
import { COMMENTS_PREFIX, PREFIX_ISSUE } from '../constants';
import { downloadIssue, downloadComments, postLoadComments as loadCommentsRest } from '../actions';
import { IssuePageCss, LoaderCss, CommentCss, ListCss } from '../styles';

class IssuePage extends React.Component {
  componentWillMount() {
    const query = this.props.query;
    const pathname = this.props.pathname;
    this.getIssue(pathname, query);
  }

  componentWillUpdate(nextProps) {
    const nextSearch = nextProps.search;
    const nextPath = nextProps.pathname;
    const prevSearch = this.props.search;
    const prevPath = this.props.pathname;
    if (prevPath !== nextPath || prevSearch !== nextSearch) {
      this.getIssue(nextPath, nextProps.query);
    }
  }

  getIssue(pathname, query) {
    this.props.loadIssue(pathname, query);
  }

  render() {
    const { issue, message, error, pages, pathname, loadComments, postLoadComments } = this.props;
    if (error) {
      return null;
    }
    const commentsUrl = issue.comments_url;
    const loaded = !message;
    // console.log('issue ', issue);
    const item = {
      body: issue.body,
      user: issue.user,
      created_at: issue.created_at,
    };
    const body = loaded ? (<div>
      <h2>
        <CreateHtmlLink
          url={issue.html_url}
          anckhor={`${issue.title} #${issue.number}`}
          title={`open issue #${issue.number} on github`}
        />
      </h2>
      <div className={IssuePageCss.header}>
        {'State: '}
        <h3 className={IssuePageCss[issue.state] || IssuePageCss.default}>
          {issue.state}!
        </h3>
        {' Opened by '}<strong>
          {issue.user && issue.user.login}
        </strong>
        {' '}
        <DateToLocale source={issue.created_at} lang='en' />
      </div>
      <Comment
        item={item}
        className={CommentCss}
      />
      <Fetcher
        // child props
        RenderChild={Comment}
        itemClass={CommentCss}
        containerClass={ListCss}
        // ownProps
        pathname={pathname}
        ChildComponent={List}
        prefix={COMMENTS_PREFIX}
        fetchCallback={loadComments}
        fetchRestCallback={postLoadComments}
        urlPath={commentsUrl}
      />
      <Pages pages={pages} pathname={pathname} />
    </div>) : null;
    return (
      <div className={IssuePageCss.container}>
        <Loader loaded={loaded} className={LoaderCss.container}>
          {body}
        </Loader>
      </div>
    );
  }
}
const page = PropTypes.shape({
  rel: PropTypes.string,
  url: PropTypes.string,
});

IssuePage.propTypes = {
  issue: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  loadIssue: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  postLoadComments: PropTypes.func.isRequired,
  message: PropTypes.string,
  pages: PropTypes.shape({
    next: page,
    prev: page,
    first: page,
    last: page,
  }),
  error: PropTypes.shape({
    message: PropTypes.string,
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    query: PropTypes.object,
  }),
};

const getPages = (headers = { Link: {} }) => headers.Link;
const getCommentsUrl = (body = {}) => (body.commets ? body.comments_url : '');
const mapStateToProps = (state, ownProps) => ({
  issue: state[PREFIX_ISSUE].body || {},
  commentsUrl: getCommentsUrl(state[PREFIX_ISSUE].body),
  message: state[PREFIX_ISSUE].message,
  pages: getPages(state[PREFIX_ISSUE].headers),
  pathname: ownProps.location.pathname,
  search: ownProps.location.search,
  query: ownProps.location.query,
});


const mapDispatchToProps = dispatch => ({
  loadIssue: bindActionCreators(downloadIssue, dispatch),
  loadComments: bindActionCreators(downloadComments, dispatch),
  postLoadComments: bindActionCreators(loadCommentsRest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuePage);
