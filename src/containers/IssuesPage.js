import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Message from 'react-message';
import { addNotification as notify } from 'reapop';
import Loader from 'react-loader';
import { browserHistory } from 'react-router';
import { IssuesList } from '../components';
import Pages from '../components/Pages';
import loadPath from '../actions/download';
import { ISSUES_PREFIX } from '../constants';

import { IssuesPageCss, LoaderCss } from '../styles';

class IssuesPage extends React.Component {

  componentWillMount() {
    const query = this.props.query;
    const pathname = this.props.pathname;
    this.getIssues(pathname, query);
  }

  componentWillUpdate(nextProps) {
    console.log('nextProps ', nextProps);
    const nextSearch = nextProps.search;
    const nextPath = nextProps.pathname;
    const prevSearch = this.props.search;
    const prevPath = this.props.pathname;
    if (prevPath !== nextPath || prevSearch !== nextSearch) {
      this.getIssues(nextPath, nextProps.query);
    }
  }

  getIssues(pathname, query) {
    console.log('pathname', pathname);
    console.log('query', query);
    console.log('this.props.query', this.props.query);
    this.props.loadIssuesFromServer(pathname, query);
    const error = this.props.error;
    this.handleError(error);
  }

  handleError(error) {
    if (error) {
      const pathname = this.props.pathname;
      const notLoaded = () => { browserHistory.push('/'); };
      const retry = () => this.getIssues(pathname);
      this.props.notify({
        title: `Can't load path ${pathname}`,
        status: 'error',
        bacground: 'rgb(180, 215, 236)',
        dismissible: false,
        dismissAfter: 10000,
        message: error.message || 'Path not found',
        closeButton: true,
        position: 'tc',
        buttons: [
          {
            name: 'Ok',
            primary: true,
            onClick: notLoaded,
          },
          {
            name: 'Retry',
            primary: true,
            onClick: retry,
          },
        ],
      });
    }
  }

  render() {
    const { issues, message, error, pages, pathname } = this.props;
    console.log('pages ', pages);
    console.log('issues', issues);
    const loaded = !message;
    const listIssues = loaded ? issues : [];
    const data = (
      <div className={IssuesPageCss.container}>
        <Loader loaded={loaded} className={LoaderCss.container}>
          <IssuesList pathname={pathname}>
            {listIssues}
          </IssuesList>
        </Loader>
        <Pages pages={pages} pathname={pathname} />
      </div>
    );
    return error ? error.message : data;
  // номера, названия, даты открытия.
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
  notify: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  loadIssuesFromServer: PropTypes.func.isRequired,
};
const getPages = (headers = { Link: {} }) => headers.Link;
const mapStateToProps = (state, ownProps) => ({
  issues: state.issues.body,
  error: state.issues.error,
  message: state.issues.message,
  pages: getPages(state.issues.headers),
  pathname: ownProps.location.pathname,
  search: ownProps.location.search,
  query: ownProps.location.query,
});


const loadIssues = loadPath(ISSUES_PREFIX);

const mapDispatchToProps = dispatch => ({
  loadIssuesFromServer: bindActionCreators(loadIssues, dispatch),
  notify: bindActionCreators(notify, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);
