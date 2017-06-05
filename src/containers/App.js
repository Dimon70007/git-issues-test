import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import NotificationSystem from 'reapop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getFormValues } from 'redux-form';
import theme from 'reapop-theme-wybo';
import path from 'path';
import { downloadRepos } from '../actions';
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
    this.fetchRepo = ::this.fetchRepo;
  }
  // componentWillUpdate(nextProps) {
  //  todo postloading others pages for repos
  // }

  fetchRepo(owner) {
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
            onOwnerBlur={this.fetchRepo}
          />
        </div>
        <div className={AppCss['App-main']}>
          <Settings
            perPage={perPage}
            onPerPageChange={addQuery}
            perPageList={this.props.perPageList}
          />
          {this.props.children}
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
  perPage: PropTypes.number.isRequired,
  perPageList: PropTypes.arrayOf(PropTypes.number),
};

const getRepos = ({ body = {} }) => body.items;
const mapStateToProps = (state, ownProps) => ({
  // formValues: getFormValues('leftSearch')(state),
  perPage: Number(ownProps.location && ownProps.location.query.per_page) || PER_PAGE_LIST[1],
  perPageList: PER_PAGE_LIST,
  repos: getRepos(state.repos),
});

const mapDispatchToProps = dispatch => ({
  fetchRepos: bindActionCreators(downloadRepos, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
