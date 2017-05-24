import React from 'react';
import PropTypes from 'prop-types';

const RenderField = ({ input, label, type, meta: { touched, error /* , warning */ } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error && <span style={{ color: '#aaa' }}>{error}</span>)
        // || (warning && <span>{warning}</span>)
      )
    }
  </div>
);

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export default RenderField;