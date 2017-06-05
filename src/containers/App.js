import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import NotificationSystem from 'reapop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getFormValues } from 'redux-form';
import theme from 'reapop-theme-wybo';
import path from 'path';
import { getLink } from '../helpers';
import { downloadRepos, postLoadRepos } from '../actions';
import { PER_PAGE_LIST } from '../constants';
import spongeBob from '../sponge_bob.jpg';
import { SearchForm, Settings } from '../components';
import { AppCss, SearchFormLeftCss } from '../styles';

const handleOnSearch = (newPath) => {
  const location = { ...browserHistory.getCurrentLocation(), pathname: newPath };
  browserHistory.push(location);
};

function addQuery(newQuery) {
  const location = { ...browserHistory.getCurrentLocation() };
  location.query = { ...location.query, ...newQuery };
  browserHistory.push(location);
}

function onValidData(values) {
  const { owner, repo } = values;
  if (owner && repo) {
    const gitPath = path.resolve(
      'repos', owner, repo, 'issues',
    );
    handleOnSearch(gitPath);
  } else {
    console.log('Not handled values in App.js: ', values);
  }
}

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fetchRepos = ::this.fetchRepos;
  }
  componentWillUpdate(nextProps) {
  //  todo postloading others pages for repos
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
    const perPage = this.props.perPage;
    const reposLoaded = this.props.repos;
    const repos = reposLoaded ?
      reposLoaded.map(repo => repo.name) : [];
    return (
      <div className={AppCss.App}>
        <NotificationSystem
          theme={theme}
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
            perPageList={this.props.perPageList}
            onPerPageChange={addQuery}
          />
          {this.props.children}
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
};

const getRepos = (body = {}) => body.items;
const getPages = (headers = { Link: {} }) => headers.Link;

const mapStateToProps = (state, ownProps) => ({
  // formValues: getFormValues('leftSearch')(state),
  perPage: Number(ownProps.location && ownProps.location.query.per_page) || PER_PAGE_LIST[1],
  perPageList: PER_PAGE_LIST,
  repos: state.repos && getRepos(state.repos.body),
  pages: state.repos && getPages(state.repos.headers),
});

const mapDispatchToProps = dispatch => ({
  fetchRepos: bindActionCreators(downloadRepos, dispatch),
  fetchReposRest: bindActionCreators(postLoadRepos, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
