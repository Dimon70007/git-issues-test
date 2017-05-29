import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
// import '!style-loader!css-loader!font-awesome/css/font-awesome.min.css';
import NotificationSystem from 'reapop';
import { connect } from 'react-redux';
import theme from 'reapop-theme-wybo';
import path from 'path';
import { PER_PAGE_LIST } from '../constants';
// import mergeurlQuery from '../mergeurlQuery';
import spongeBob from '../sponge_bob.jpg';
import SearchForm from '../components/SearchForm';
import Settings from '../components/Settings';
import { AppCss, SearchFormLeftCss } from '../styles';

const handleOnSearch = (newPath) => {
  const location = { ...browserHistory.getCurrentLocation(), pathname: newPath };
  browserHistory.push(location);
};

const onValidData = (values) => {
  const { owner, repo } = values;
  const prefix = 'repos';
  const postfix = 'issues';
  if (owner && repo) {
    const gitPath = path.resolve(
      prefix, owner, repo, postfix,
    );
    handleOnSearch(gitPath);
  } else {
    console.log('Not handled values in App.js: ', values);
  }
};

class App extends React.PureComponent {

  render() {
    const perPage = this.props.perPage;
    const addQuery = this.props.addQuery;
    return (
      <div className={AppCss.App}>
        <NotificationSystem theme={theme} />
        <div className={AppCss['App-header']}>
          <SearchForm
            form='leftSearch'
            styles={SearchFormLeftCss}
            onSubmit={onValidData}
          />
          <img
            src={spongeBob}
            className={AppCss['App-logo']}
            alt='sponge_bob'
          />
        </div>
        <div className={AppCss['App-intro']}>
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
  children: PropTypes.node,
  perPage: PropTypes.number.isRequired,
  addQuery: PropTypes.func.isRequired,
  // params: PropTypes.shape({
  //   per_page: PropTypes.number.isRequired,
  //   page: PropTypes.number.isRequired,
  // }),
  // pathname: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  // params: state.params,
  pathname: ownProps.location.pathname,
  perPage: Number(ownProps.location && ownProps.location.query.per_page) || PER_PAGE_LIST[1],
  perPageList: PER_PAGE_LIST,
});

const mapDispatchToProps = dispatch => ({
  addQuery: (values) => {
    const location = { ...browserHistory.getCurrentLocation() };
    location.query = { ...location.query, ...values };
    browserHistory.push(location);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
