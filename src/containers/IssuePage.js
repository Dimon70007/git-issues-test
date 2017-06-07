import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import { Pages } from '../components';
// import List from '../components/List';
// import Comment from '../components/Comment';
import { downloadIssue } from '../actions';
import { IssuePageCss, LoaderCss, CommentCss, ListCss } from '../styles';

class IssuePage extends React.Component {
  constructor(props) {
    super(props);
    const query = props.query;
    const pathname = props.pathname;
    console.log('pathname ', pathname);
    console.log('query ', query);
    // this.getIssue(pathname, query);
  }

  componentWillUpdate(nextProps) {
    const nextSearch = nextProps.search;
    const nextPath = nextProps.pathname;
    const prevSearch = this.props.search;
    const prevPath = this.props.pathname;
    if (prevPath !== nextPath || prevSearch !== nextSearch) {
      console.log('nextPath ', nextPath);
      console.log('nextProps ', nextProps);
      // this.getIssue(nextPath, nextProps.query);
    }
  }

  // getIssue(pathname, query) {
  //   this.props.loadIssue(pathname, query);
  // }

  render() {
    const { issue, items, message, error, pages, pathname } = this.props;
    if (error) {
      return null;
    }
    const loaded = !message;
    const listIssue = loaded ? items : [];
    console.log('issue ', issue);
    return (
      <div className={IssuePageCss.container}>
        <Loader loaded={loaded} className={LoaderCss.container}>
          {/* <List
            pathname={pathname}
            RenderChild={Comment}
            itemClass={CommentCss}
            containerClass={ListCss}
            >
            {listIssue}
          </List> */}
        </Loader>
        <Pages pages={pages} pathname={pathname} />
      </div>
    );
  // номера, названия, даты открытия.
  }
}
const page = PropTypes.shape({
  rel: PropTypes.string,
  url: PropTypes.string,
});

IssuePage.propTypes = {
  issue: PropTypes.object,
  items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          number: PropTypes.number,
          created_at: PropTypes.string,
          id: PropTypes.number,
        }),
  ),
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
  search: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  message: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  // loadIssue: PropTypes.func.isRequired,
};

const getPages = (headers = { Link: {} }) => headers.Link;
const getItems = (body = { items: [] }) => body.items;

const mapStateToProps = (state, ownProps) => ({
  issue: state.issue.body,
  items: getItems(state.issue.body),
  message: state.issue.message,
  pages: getPages(state.issue.headers),
  pathname: ownProps.location.pathname,
  search: ownProps.location.search,
  query: ownProps.location.query,
});


const mapDispatchToProps = dispatch => ({
  loadIssue: bindActionCreators(downloadIssue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuePage);
