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

const loadIssues = loadPath(ISSUES_PREFIX);

class IssuesPage extends React.Component {

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate(prevProps) {
    const prevPath = prevProps && prevProps.pathname;
    const nextPath = this.props.pathname;
    if (prevPath !== nextPath) {
      this.getIssues(nextPath);
    }
  }
  getIssues(newPath) {
    this.props.loadIssuesFromServer(newPath);
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
    const message = this.props.message;
    const error = this.props.error;
    this.handleError(error);
    const loaded = !message;
    const listIssues = loaded ? issues : [];
    return (
      <div className={IssuesPageCss.container}>
        <Loader loaded={loaded} className={LoaderCss.container}>
          <IssuesList pathname={this.props.pathname}>
            {listIssues}
          </IssuesList>
        </Loader>
      </div>
    );
  // номера, названия, даты открытия.
  }
}

IssuesPage.propTypes = {
  issues: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        number: PropTypes.number,
        created_at: PropTypes.string,
        id: PropTypes.number,
      }),
  ),
  message: PropTypes.string,
  error: PropTypes.object,
  notify: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  loadIssuesFromServer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  issues: state.issues.payload,
  error: state.issues.error,
  message: state.issues.message,
  pathname: ownProps.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  loadIssuesFromServer: bindActionCreators(loadIssues, dispatch),
  notify: bindActionCreators(notify, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);
