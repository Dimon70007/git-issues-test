import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import theme from 'reapop-theme-wybo';
import NotificationSystem from 'reapop';
import spongeBob from '../sponge_bob.jpg';
import { SearchForm } from '../components';
import { AppCss, SearchFormLeftCss, SearchFormRightCss } from '../styles';

const handleOnSearch = (newPath) => {
  browserHistory.push(newPath);
};

class App extends React.PureComponent {
  render() {
    return (
      <div className={AppCss.App}>
        <NotificationSystem theme={theme} />
        <div className={AppCss['App-header']}>
          <SearchForm
            styles={SearchFormLeftCss}
            onSearch={handleOnSearch}
            prefix='repos'
            postfix='issues'
          />
          <SearchForm
            styles={SearchFormRightCss}
            onSearch={handleOnSearch}
            prefix='repos'
            postfix='issues'
          />
          <img
            src={spongeBob}
            className={AppCss['App-logo']}
            alt='sponge_bob'
          />
        </div>
        <div className={AppCss['App-intro']}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
export default App;
