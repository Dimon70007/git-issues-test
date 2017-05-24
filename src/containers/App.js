import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
// import '!style-loader!css-loader!font-awesome/css/font-awesome.min.css';
import NotificationSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import path from 'path';
import spongeBob from '../sponge_bob.jpg';
import SearchForm from '../components/SearchForm';
import { AppCss, SearchFormLeftCss, SearchFormRightCss } from '../styles';

const handleOnSearch = (newPath) => {
  browserHistory.push(newPath);
};

const makePath = (...params) =>
  path.resolve(...params).toString();

const onValidData = (values) => {
  const { owner, repo } = values;
  const prefix = 'repos';
  const postfix = 'issues';
  if (owner && repo) {
    const gitPath = makePath(
      prefix, owner, repo, postfix);
    handleOnSearch(gitPath);
  } else {
    console.log(values);
  }
};

class App extends React.PureComponent {
  render() {
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
