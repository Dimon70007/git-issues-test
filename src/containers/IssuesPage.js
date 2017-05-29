import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Message from 'react-message';
import { addNotification as notify } from 'reapop';
import Loader from 'react-loader';
import { browserHistory } from 'react-router';
// import ErrorMessage from '../components/ErrorMessage';
import { IssuesList } from '../components';
import loadPath from '../actions/download';
import { ISSUES_PREFIX } from '../constants';

import { IssuesPageCss, LoaderCss } from '../styles';
// import { ErrorMessageCss } from '../styles';

class IssuesPage extends React.Component {

  componentWillMount() {
    const query = this.props.query;
    const pathname = this.props.pathname;
    this.getIssues(pathname, query);
  }


  componentWillReceiveProps(nextProps) {
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
    this.props.loadIssuesFromServer(pathname, query);
    console.log('pathname', pathname);
    console.log('query', query);
    console.log('this.props.query', this.props.query);
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
    const issues = this.props.issues;
    console.log(issues);
    const message = this.props.message;
    const error = this.props.error;
    const loaded = !message;
    const listIssues = loaded ? issues : [];
    const data = (
      <div className={IssuesPageCss.container}>
        <Loader loaded={loaded} className={LoaderCss.container}>
          <IssuesList pathname={this.props.pathname}>
            {listIssues}
          </IssuesList>
          {/* <Link to={pathname} */}
        </Loader>
      </div>
    );
    return error ? '' : data;
  // номера, названия, даты открытия.
  }
}

// const pagePropTypes = PropTypes.shape({
//   page: PropTypes.string,
//   per_page: PropTypes.string,
//   url: PropTypes.string,
// });

IssuesPage.propTypes = {
  issues: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        number: PropTypes.number,
        created_at: PropTypes.string,
        id: PropTypes.number,
      }),
  ),
  // params: pagePropTypes,
  // nextPage: pagePropTypes,
  // prevPage: pagePropTypes,
  // lastPage: pagePropTypes,
  message: PropTypes.string,
  error: PropTypes.object,
  notify: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  loadIssuesFromServer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  issues: state.issues.response,
  error: state.issues.error,
  message: state.issues.message,
  pathname: ownProps.location.pathname,
  search: ownProps.location.search,
  query: ownProps.location.query,
  // params: state.params.isRequired,
  // nextPage: state.issues.headers.Link.next,
  // prevPage: state.issues.headers.Link.prev,
  // lastPage: state.issues.headers.Link.last,
});


const loadIssues = loadPath(ISSUES_PREFIX);

const mapDispatchToProps = dispatch => ({
  loadIssuesFromServer: bindActionCreators(loadIssues, dispatch),
  notify: bindActionCreators(notify, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);
