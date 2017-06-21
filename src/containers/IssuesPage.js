import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IssuesList, Pages, Fetcher, Settings } from '../components';
import { pushOptions } from '../helpers';
import { ISSUES_PREFIX, VISIBILITY_FILTER, PER_PAGE_LIST } from '../constants';
import { downloadIssues } from '../actions';
import { IssuesPageCss } from '../styles';

const addQuery = (newQuery) => {
  pushOptions({ query: newQuery });
};

class IssuesPage extends React.Component {
  constructor(props) {
    super(props);
    this.getIssues = ::this.getIssues;
  }
  getIssues(pathname, query) {
    this.props.loadIssues(pathname, query);
  }

  render() {
    const { issues, message, error, pages, pathname, query, perPage, perPageList } = this.props;
    if (error.message) {
      return null;
    }
    const loaded = !message && issues;
    const pagination = loaded && (<Pages pages={pages} pathname={pathname} />);
    const first = loaded && loaded[0];
    const availableKeys = first ? Object.keys(first) : [];
    return (
      <div className={IssuesPageCss.container}>
        <Fetcher
          prefix={ISSUES_PREFIX}
          fetchCallback={this.getIssues}
          urlPath={pathname}
          urlQuery={query}
        />
        <Settings
          availableKeys={availableKeys}
          perPage={perPage}
          perPageList={perPageList}
          onPerPageChange={addQuery}
        />
        {pagination}
        <IssuesList pathname={pathname}>
          {loaded || []}
        </IssuesList>
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
  // search: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  message: PropTypes.string,
  error: PropTypes.object,
  pathname: PropTypes.string.isRequired,
  loadIssues: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  perPageList: PropTypes.arrayOf(PropTypes.number),
};

const getPages = (headers = { Link: {} }) => headers.Link;
const filteredIssues = ({ body = [] }, filters = []) =>
  body.filter(item => filters.reduce((acc, filt) => acc && filt(item), true));
const mapStateToProps = (state, ownProps) => ({
  issues: filteredIssues(state[ISSUES_PREFIX], state[VISIBILITY_FILTER]),
  error: state.error,
  message: state[ISSUES_PREFIX].message,
  pages: getPages(state[ISSUES_PREFIX].headers),
  pathname: ownProps.location.pathname,
  // search: ownProps.location.search,
  query: ownProps.location.query,
  params: ownProps.location,
  perPage: (ownProps.location && Number(ownProps.location.query.per_page)) || PER_PAGE_LIST[1],
  perPageList: PER_PAGE_LIST,
});

const mapDispatchToProps = dispatch => ({
  loadIssues: bindActionCreators(downloadIssues, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);
