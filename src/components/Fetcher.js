import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { getLink } from '../helpers';
import { LoaderCss } from '../styles';

/*
  wrapper that will send request
  and [optional] - load data's rest with prefix
  and display loading info
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
      fetchRestCallback,
    } = nextProps;
    const {
      urlPath: prevUrl,
      urlQuery: prevUrlQuery,
      links: prevLinks,
    } = this.props;
    if ((nextUrl && nextUrl !== prevUrl) ||
        nextUrlQuery !== prevUrlQuery) {
      this.fetchData(nextUrl, nextUrlQuery);
    } else if (fetchRestCallback) {
      const oldNextLink = getLink('next', prevLinks);
      const newNextLink = getLink('next', nextLinks);
      if (newNextLink &&
          oldNextLink !== newNextLink) {
        setTimeout(() => fetchRestCallback(newNextLink), 10);
      }
    }
  }

  fetchData(urlPath, query) {
    this.props.fetchCallback(urlPath, query);
  }

  render() {
    const { loaded, notDisplayLoader } = this.props;
    return notDisplayLoader ? null : (
      <Loader loaded={loaded} className={LoaderCss.container} />
    );
  }
}

const page = PropTypes.shape({
  rel: PropTypes.string,
  url: PropTypes.string,
});

Fetcher.propTypes = {
  fetchCallback: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
  urlPath: PropTypes.string,
  urlQuery: PropTypes.object, // [optional]
  fetchRestCallback: PropTypes.func, // [optional]
  notDisplayLoader: PropTypes.bool, // [optional]
  links: PropTypes.shape({  // does not need to pass
    next: page,
    last: page,
  }),
  loaded: PropTypes.bool,   // does not need to pass
};

const getLinks = ({ headers = { Link: {} } }) => headers.Link;

const mapStateToProps = (state, ownProps) => {
  const prefix = ownProps.prefix;
  const ownState = state[prefix];
  return {
    loaded: ownState && !ownState.message,
    links: ownState && getLinks(ownState),
  };
};

export default connect(mapStateToProps)(Fetcher);
