import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import NotificationSystem from 'reapop';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import theme from 'reapop-theme-wybo';
import path from 'path';
import { PER_PAGE_LIST } from '../constants';
import spongeBob from '../sponge_bob.jpg';
import { SearchForm, Settings } from '../components';
import { AppCss, SearchFormLeftCss } from '../styles';

const handleOnSearch = (newPath) => {
  const location = { ...browserHistory.getCurrentLocation(), pathname: newPath };
  browserHistory.push(location);
};


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onValidData = ::this.onValidData;
  }
  onValidData(values) {
    const { owner, repo } = values;
    const prefix = 'repos';
    const postfix = 'issues';
    console.log('formValues ', this.props.formValues);
    console.log('values App ', values);
    if (owner && repo) {
      const gitPath = path.resolve(
        prefix, owner, repo, postfix,
      );
      handleOnSearch(gitPath);
    } else {
      console.log('Not handled values in App.js: ', values);
    }
  }

  render() {
    const perPage = this.props.perPage;
    const addQuery = this.props.addQuery;
    return (
      <div className={AppCss.App}>
        <NotificationSystem
          theme={theme}
        />
        <div className={AppCss['App-header']}>
          <img
            src={spongeBob}
            className={AppCss['App-logo']}
            alt='sponge_bob'
          />
          <SearchForm
            form='leftSearch'
            styles={SearchFormLeftCss}
            onSubmit={this.onValidData}
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
  perPageList: PropTypes.arrayOf(PropTypes.number),
};

const mapStateToProps = (state, ownProps) => ({
  formValues: getFormValues('leftSearch')(state),
  perPage: Number(ownProps.location && ownProps.location.query.per_page) || PER_PAGE_LIST[1],
  perPageList: PER_PAGE_LIST,
});

const mapDispatchToProps = () => ({
  addQuery: (newQuery) => {
    const location = { ...browserHistory.getCurrentLocation() };
    location.query = { ...location.query, ...newQuery };
    browserHistory.push(location);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
