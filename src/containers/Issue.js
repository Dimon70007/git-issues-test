import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Message from 'react-message';
import { addNotification as notify } from 'reapop';
import Loader from 'react-loader';

import { IssuesList } from '../components';
import loadPath from '../actions/download';
import { PREFIX_ISSUE } from '../constants';
import { IssuesPage as IssueCss, LoaderCss } from '../styles';
// import { ErrorMessageCss } from '../styles';

const loadData = loadPath(PREFIX_ISSUE);

class Issue extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate(prevProps) {
    const prevPath = prevProps && prevProps.pathname;
    const nextPath = this.props.pathname;
    if (prevPath !== nextPath) {
      this.getIssueData(nextPath);
    }
  }
  getIssueData(newPath) {
    this.props.loadIssueData(newPath);
  }
  handleError(error) {
    if (error) {
      const pathname = this.props.pathname;
      const retry = () => this.getIssues(pathname);
      this.props.notify({
        title: `Can't load path ${pathname}`,
        status: 'error',
        dismissible: false,
        dismissAfter: 10000,
        message: error.message || 'Path not found',
        closeButton: true,
        position: 'tc',
        buttons: [
          {
            name: 'Ok',
            primary: true,
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
      <div className={IssueCss.container}>
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

Issue.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number,
    created_at: PropTypes.string,
    id: PropTypes.number,
  }),
  message: PropTypes.string,
  error: PropTypes.object,
  notify: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  loadIssueData: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  issue: state.issue.payload,
  error: state.issue.error,
  message: state.issue.message,
  pathname: ownProps.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  loadIssueData: bindActionCreators(loadData, dispatch),
  notify: bindActionCreators(notify, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
