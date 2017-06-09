import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import { Pages } from '../components';
import List from '../components/List';
import Fetcher from './Fetcher';
import { COMMENTS_PREFIX, PREFIX_ISSUE } from '../constants';
import Comment from '../components/Comment';
import { downloadIssue, downloadComments } from '../actions';
import { IssuePageCss, LoaderCss, CommentCss, ListCss } from '../styles';

class IssuePage extends React.Component {
  constructor(props) {
    super(props);
    const query = props.query;
    const pathname = props.pathname;
    // console.log('pathname ', pathname);
    // console.log('query ', query);
    this.getIssue(pathname, query);
  }

  componentWillUpdate(nextProps) {
    const nextSearch = nextProps.search;
    const nextPath = nextProps.pathname;
    const prevSearch = this.props.search;
    const prevPath = this.props.pathname;
    if (prevPath !== nextPath || prevSearch !== nextSearch) {
      console.log('nextPath ', nextPath);
      console.log('nextProps ', nextProps);
      this.getIssue(nextPath, nextProps.query);
    }
  }

  getIssue(pathname, query) {
    this.props.loadIssue(pathname, query);
  }

  render() {
    const { issue, message, error, pages, pathname, loadComments } = this.props;
    if (error) {
      return null;
    }
    const commentsUrl = issue.comments_url;
    const loaded = !message;
    console.log('issue ', issue);
    // const item = {
    //   title: issue.body,
    //   number: issue.number,
    //   created_at: issue.created_at,
    // };
    return (
      <div className={IssuePageCss.container}>
        <Loader loaded={loaded} className={LoaderCss.container}>
          {/* { loaded ? (<h4>{issue.title}</h4>
            <Comment
              item={item}
              className={CommentCss}
          />)} */}
          <Fetcher
            // child props
            pathname={pathname}
            RenderChild={Comment}
            itemClass={CommentCss}
            containerClass={ListCss}
            // ownProps
            ChildComponent={List}
            prefix={COMMENTS_PREFIX}
            fetchCallback={loadComments}
            urlPath={commentsUrl}
          />
        </Loader>
        <Pages pages={pages} pathname={pathname} />
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
  message: PropTypes.string,
  // items: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     title: PropTypes.string,
  //     number: PropTypes.number,
  //     created_at: PropTypes.string,
  //     id: PropTypes.number,
  //   }),
  // ),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuePage);
