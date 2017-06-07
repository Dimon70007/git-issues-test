import React from 'react';
import PropTypes from 'prop-types';

class DisplayError extends React.Component {
  componentWillUpdate(nextProps) {
    const { clearError, error = {}, notify, pushOptions } = nextProps;
    const shouldDisplay = error.message;
    const handleError = () => {
      const notLoaded = () => {
        pushOptions({ pathname: '/' });
      };
      const q = error.query && error.query.q;
      notify({
        title: `Couldn't load path ${error.path} with query ${q || ''}`,
        status: 'error',
        dismissible: false,
        dismissAfter: 10000,
        message: error.message || 'Path not found',
        closeButton: true,
        position: 'tl',
        buttons: [
          {
            name: 'Ok',
            primary: true,
            onClick: notLoaded,
          },
        ],
      });
      clearError();
    };
    if (shouldDisplay) {
      handleError();
    }
  }
  render() { return null; }
}
DisplayError.propTypes = {
  notify: PropTypes.func.isRequired,
  error: PropTypes.object,
  pushOptions: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default DisplayError;
