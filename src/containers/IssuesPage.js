import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import { IssuesList, Pages } from '../components';
import { downloadIssues } from '../actions';
import { IssuesPageCss, LoaderCss } from '../styles';

class IssuesPage extends React.Component {
  constructor(props) {
    super(props);
    const query = props.query;
    const pathname = props.pathname;
    this.getIssues(pathname, query);
  }

  componentWillUpdate(nextProps) {
    const nextSearch = nextProps.search;
    const nextPath = nextProps.pathname;
    const prevSearch = this.props.search;
    const prevPath = this.props.pathname;
    if (prevPath !== nextPath || prevSearch !== nextSearch) {
      this.getIssues(nextPath, nextProps.query);
    }
  }

  getIssues(pathname, query) {
    this.props.loadIssues(pathname, query);
  }
  render() {
    const { issues, message, error, pages, pathname } = this.props;
    if (error.message) {
      return null;
    }
    const loaded = !message;
    const listIssues = loaded ? issues : [];
    return (
      <div className={IssuesPageCss.container}>
        <Loader loaded={loaded} className={LoaderCss.container}>
          <IssuesList pathname={pathname}>
            {listIssues}
          </IssuesList>
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

IssuesPage.propTypes = {
  issues: PropTypes.arrayOf(
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
  search: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  message: PropTypes.string,
  error: PropTypes.object,
  pathname: PropTypes.string.isRequired,
  loadIssues: PropTypes.func.isRequired,
};

const getPages = (headers = { Link: {} }) => headers.Link;

const mapStateToProps = (state, ownProps) => ({
  issues: state.issues.body,
  error: state.error,
  message: state.issues.message,
  pages: getPages(state.issues.headers),
  pathname: ownProps.location.pathname,
  search: ownProps.location.search,
  query: ownProps.location.query,
  params: ownProps.location,
});


const mapDispatchToProps = dispatch => ({
  loadIssues: bindActionCreators(downloadIssues, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);
