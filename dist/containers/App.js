import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loadPath from '../actions/download';
import { ISSUE_PREFIX } from '../constants';
import spongeBob from '../sponge_bob.jpg';
import SearchForm from '../components/SearchForm';
import { App as stylesApp, SearchFormRight as rightForm, SearchFormLeft as leftForm } from '../styles';

var loadIssues = loadPath(ISSUE_PREFIX);

var handleOnSearch = function handleOnSearch(newPath) {
  browserHistory.push(newPath);
};

var App = function (_React$PureComponent) {
  _inherits(App, _React$PureComponent);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || _Object$getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pathname = this.props.pathname;
      console.log('componentDidMount with path=', pathname);
      if (pathname !== '/') {
        this.getIssues(pathname);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var prevPath = prevProps.pathname;
      var nextPath = this.props.pathname;
      console.log('prevPath ', prevPath);
      console.log('nextPath ', nextPath);
      if (prevPath !== nextPath) {
        this.getIssues(nextPath);
      }
    }
  }, {
    key: 'getIssues',
    value: function getIssues(newPath) {
      this.props.loadIssuesFromServer(newPath);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: stylesApp.App },
        React.createElement(
          'div',
          { className: stylesApp['App-header'] },
          React.createElement('img', {
            src: spongeBob,
            className: stylesApp['App-logo'],
            alt: 'sponge_bob'
          })
        ),
        React.createElement(
          'div',
          { className: stylesApp['App-intro'] },
          this.props.children
        )
      );
    }
  }]);

  return App;
}(React.PureComponent);

App.propTypes = {
  loadIssuesFromServer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    pathname: ownProps.location.pathname
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadIssuesFromServer: bindActionCreators(loadIssues, dispatch)
  };
};
var connectedApp = connect(mapStateToProps, mapDispatchToProps);
export default connectedApp(App);
//# sourceMappingURL=/home/otvazhniy/jsProjects/git-issues-test/maps/containers/App.js.map