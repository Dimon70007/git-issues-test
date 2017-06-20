import React from 'react';
import PropTypes from 'prop-types';
import NotificationSystem, { addNotification as notification } from 'reapop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import theme from 'reapop-theme-wybo';
import path from 'path';
import spongeBob from '../imgs/sponge_bob.jpg';
import { pushOptions } from '../helpers';
import { downloadRepos, postLoadRepos, clearError } from '../actions';
import { REPOS_PREFIX, PATHNAME_PREFIX } from '../constants';
import { SearchForm, Fetcher } from '../components';
import DisplayError from '../components/DisplayError';
import { AppCss, SearchFormLeftCss } from '../styles';

const onValidData = (values) => {
  const { owner, repo } = values;
  if (owner && repo) {
    const gitPath = path.resolve(
      PATHNAME_PREFIX, 'repos', owner, repo, 'issues',
    );
    const query = {
      filter: 'state:open type:issue',
      // sort: 'stars',
      // per_page: '100',
    };
    // const gitPath = path.resolve(
    //   'search/issues',
    // );
    // const query = {
    //   q: 'state:open type:issue',
    //   repo: `${owner}/${repo}`,
    //   // sort: 'stars',
    //   // per_page: '100',
    // };
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

  fetchRepos(owner) {
    if (owner) {
      const gitPath = '/search/repositories';
      const query = {
        q: `user:${owner}`,
        sort: 'stars',
        per_page: '100',
      };
      this.props.fetchRepos(gitPath, query);
    } else {
      console.log('Something went wrong... Fetching repos for user: ', owner, ' is strange');
    }
  }

  render() {
    const {
      fetchReposRest,
      clearErr,
      repos: reposLoaded,
      children,
      notify,
      error,
    } = this.props;
    const repos = reposLoaded ?
      reposLoaded.map(repo => repo.name) : [];
    const noop = () => {};
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
        <Fetcher
          fetchCallback={noop}
          urlPath={null} // disabling fetchCallback
          prefix={REPOS_PREFIX}
          fetchRestCallback={fetchReposRest}
          notDisplayLoader
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
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
  children: PropTypes.node,
  fetchRepos: PropTypes.func.isRequired,
  fetchReposRest: PropTypes.func.isRequired,
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

// const getRepos = (body = {}) => body.items;
const getPages = (headers = { Link: {} }) => headers.Link;

const mapStateToProps = (state, ownProps) => ({
  pathname: ownProps.location && ownProps.location.pathname,
  error: state.error,
  repos: state[REPOS_PREFIX] && state[REPOS_PREFIX].body,
  pages: state[REPOS_PREFIX] && getPages(state[REPOS_PREFIX].headers),
});

const mapDispatchToProps = dispatch => ({
  fetchRepos: bindActionCreators(downloadRepos, dispatch),
  fetchReposRest: bindActionCreators(postLoadRepos, dispatch),
  notify: bindActionCreators(notification, dispatch),
  clearErr: bindActionCreators(clearError, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
