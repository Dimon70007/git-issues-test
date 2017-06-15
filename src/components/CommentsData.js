import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Comment, Fetcher } from '../components';
import { COMMENTS_PREFIX } from '../constants';
import { downloadComments, postLoadComments as loadCommentsRest } from '../actions';
import { CommentCss, ListCss } from '../styles';

class IssuePage extends React.PureComponent {
  render() {
    const {
      message,
      error,
      urlPath,
      loadComments,
      postLoadComments,
      comments,
      } = this.props;
    if (error) {
      return null;
    }
    const loaded = !message && comments;
    const body = loaded ? (<div>
      <List
        RenderChild={Comment}
        itemClass={CommentCss}
        containerClass={ListCss}
        items={comments}
      />
    </div>) : null;

    return (
      <div>
        <Fetcher
          fetchCallback={loadComments}
          fetchRestCallback={postLoadComments}
          prefix={COMMENTS_PREFIX}
          urlPath={urlPath}
        />
        {body}
      </div>
    );
  }
}

IssuePage.propTypes = {
  // passedProps
  urlPath: PropTypes.string.isRequired,
  // connectedProps
  loadComments: PropTypes.func.isRequired,
  postLoadComments: PropTypes.func.isRequired,
  message: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      number: PropTypes.number,
      created_at: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
  error: PropTypes.object,
};

const getPages = (headers = { Link: {} }) => headers.Link;
const mapStateToProps = state => ({
  comments: state[COMMENTS_PREFIX].body,
  message: state[COMMENTS_PREFIX].message,
  pages: getPages(state[COMMENTS_PREFIX].headers),
});


const mapDispatchToProps = dispatch => ({
  loadComments: bindActionCreators(downloadComments, dispatch),
  postLoadComments: bindActionCreators(loadCommentsRest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuePage);
