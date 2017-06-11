import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Pages } from '../components';
import { getLink } from '../helpers';
import { LoaderCss } from '../styles';

/*
  wrapper that will send request and
  give the child component response with prefix
 */
class Fetcher extends React.Component {
  componentWillMount() {
    const { urlPath, urlQuery } = this.props;
    if (urlPath) {
      this.fetchData(urlPath, urlQuery);
    }
  }

  componentWillUpdate(nextProps) {
    const {
      urlPath: nextUrl,
      urlQuery: nextUrlQuery,
      links: nextLinks,
      shouldloadRest,
    } = nextProps;
    const {
      urlPath: prevUrl,
      urlQuery: prevUrlQuery,
      links: prevLinks,
    } = this.props;
    if ((nextUrl && nextUrl !== prevUrl) ||
        nextUrlQuery !== prevUrlQuery) {
      this.fetchData(nextUrl, nextUrlQuery);
    } else if (shouldloadRest) {
      const oldNextLink = getLink('next', prevLinks);
      const newNextLink = getLink('next', nextLinks);
      if (newNextLink &&
          oldNextLink !== newNextLink) {
        this.props.fetchRestCallback(newNextLink);
      }
    }
  }

  fetchData(urlPath, query) {
    this.props.fetchCallback(urlPath, query);
  }

  render() {
    const {
      ChildComponent,
      loaded,
      links,
      pathname } = this.props;
    return (
      <Loader loaded={loaded} className={LoaderCss.container}>
        <ChildComponent
          {...this.props} // inject items and all props to child
        />
        <Pages pages={links} pathname={pathname} />
      </Loader>
    );
  }
}

const page = PropTypes.shape({
  rel: PropTypes.string,
  url: PropTypes.string,
});

Fetcher.propTypes = {
  loaded: PropTypes.bool,
  prefix: PropTypes.string.isRequired,
  urlPath: PropTypes.string.isRequired,
  ChildComponent: PropTypes.func.isRequired,
  fetchCallback: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  fetchRestCallback: PropTypes.func, // [optional]
  urlQuery: PropTypes.object, // [optional]
  links: PropTypes.shape({  // does not need to pass
    next: page,
    last: page,
  }),
  items: PropTypes.oneOfType([  // does not need to pass
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ),
    PropTypes.object,
  ]),
  shouldloadRest: PropTypes.bool, // does not need to pass
};

const getData = ({ body = [] }) => (Array.isArray(body) ?
  body : body.items);
const getLinks = ({ headers = { Link: {} } }) => headers.Link;

const mapStateToProps = (state, ownProps) => {
  const prefix = ownProps.prefix;
  const ownState = state[prefix];
  return {
    loaded: ownState && !ownState.message,
    items: ownState && getData(ownState),
    links: ownState && getLinks(ownState),
    shouldloadRest: !!ownProps.fetchRestCallback,
    pathname: ownProps.pathname,
  };
};

export default connect(mapStateToProps /* , mapDispatchToProps*/)(Fetcher);
