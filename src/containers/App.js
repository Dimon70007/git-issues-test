import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import NotificationSystem, { addNotification as notification } from 'reapop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getFormValues } from 'redux-form';
import theme from 'reapop-theme-wybo';
import path from 'path';
import spongeBob from '../imgs/sponge_bob.jpg';
import { getLink, mergeLocation } from '../helpers';
import { downloadRepos, postLoadRepos, clearError } from '../actions';
import { PER_PAGE_LIST, REPOS_PREFIX, PATHNAME_PREFIX } from '../constants';
import { SearchForm, Settings } from '../components';
import DisplayError from '../components/DisplayError';
import { AppCss, SearchFormLeftCss } from '../styles';

const pushOptions = (options = {}) => {
  const locationWithOptions = mergeLocation(hashHistory.getCurrentLocation(), options);
  hashHistory.push(locationWithOptions);
};

const addQuery = (newQuery) => {
  pushOptions({ query: newQuery });
};

const onValidData = (values) => {
  const { owner, repo } = values;
  if (owner && repo) {
    const gitPath = path.resolve(
      PATHNAME_PREFIX, 'repos', owner, repo, 'issues',
    );
    const query = {
      q: 'is:open is:issue',
      // sort: 'stars',
      // per_page: '100',
    };
    pushOptions({ pathname: gitPath, query });
  } else {
    console.log('Not handled values in App.js: ', values);
  }
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fetchRepos = ::this.fetchRepos;
  }

  componentWillUpdate(nextProps) {
  //  postloading others pages for repos
    const oldNextLink = getLink('next', this.props.pages);
    const newNextLink = getLink('next', nextProps.pages);
    if (newNextLink && oldNextLink !== newNextLink) {
      setTimeout(() => this.props.fetchReposRest(newNextLink));
    }
  }

  fetchRepos(owner) {
    if (owner) {
      const gitPath = path.resolve(
        'search/repositories',
      );
      const query = {
        q: `user:${owner}`,
        sort: 'stars',
        per_page: '100',
      };
      this.props.fetchRepos(gitPath, query);
    } else {
      console.log('Fetching repos for user: ', owner, ' is strange');
    }
  }

  render() {
    const {
      clearErr,
      perPage,
      repos: reposLoaded,
      perPageList,
      children,
      notify,
      error,
    } = this.props;
    const repos = reposLoaded ?
      reposLoaded.map(repo => repo.name) : [];
    return (
      <div className={AppCss.App}>
        <NotificationSystem
          theme={theme}
        />
        <DisplayError
          clearError={clearErr}
          notify={notify}
          pushOptions={pushOptions}
          error={error}
        />
        <div className={AppCss['App-sidebar']}>
          <img
            src={spongeBob}
            className={AppCss['App-logo']}
            alt='sponge_bob'
          />
          <SearchForm
            form='leftSearch'
            styles={SearchFormLeftCss}
            repos={repos}
            reposLoaded={!!reposLoaded}
            onSubmit={onValidData}
            onOwnerBlur={this.fetchRepos}
          />
        </div>
        <div className={AppCss['App-main']}>
          <Settings
            perPage={perPage}
            perPageList={perPageList}
            onPerPageChange={addQuery}
          />
          {children}
        </div>
      </div>
    );
  }
}

const page = PropTypes.shape({
  rel: PropTypes.string,
  url: PropTypes.string,
});

App.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
  children: PropTypes.node,
  fetchRepos: PropTypes.func.isRequired,
  fetchReposRest: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  pages: PropTypes.shape({
    next: page,
    last: page,
  }),
  perPageList: PropTypes.arrayOf(PropTypes.number),
  error: PropTypes.shape({
    message: PropTypes.string,
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    query: PropTypes.object,
  }),
  notify: PropTypes.func.isRequired,
  clearErr: PropTypes.func.isRequired,
};

const getRepos = (body = {}) => body.items;
const getPages = (headers = { Link: {} }) => headers.Link;

const mapStateToProps = (state, ownProps) => ({
  // formValues: getFormValues('leftSearch')(state),
  pathname: ownProps.location && ownProps.location.pathname,
  perPage: Number(ownProps.location && ownProps.location.query.per_page) || PER_PAGE_LIST[1],
  perPageList: PER_PAGE_LIST,
  error: state.error,
  repos: state[REPOS_PREFIX] && getRepos(state[REPOS_PREFIX].body),
  pages: state[REPOS_PREFIX] && getPages(state[REPOS_PREFIX].headers),
});

const mapDispatchToProps = dispatch => ({
  fetchRepos: bindActionCreators(downloadRepos, dispatch),
  fetchReposRest: bindActionCreators(postLoadRepos, dispatch),
  notify: bindActionCreators(notification, dispatch),
  clearErr: bindActionCreators(clearError, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
