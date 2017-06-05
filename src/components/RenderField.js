import React from 'react';
import PropTypes from 'prop-types';

const RenderField = ({
  input, className, containerClass, onOwnerBlur, meta: { touched, error /* , warning */} }) => (
    <div>
      <div className={containerClass}>
        <input
          {...input}
          className={className}
          placeholder={input.name}
          type='text'
          onBlur={(event, newValue, prevValue) => {
            input.onBlur(event, newValue, prevValue);
            if (!error) {
              const value = event.target.value;
              onOwnerBlur(value);
            }
          }}
        />
      </div>
      {touched &&
        ((error && <span style={{ color: '#999' }}>{error}</span>)
          // || (warning && <span>{warning}</span>)
        )
      }
    </div>
);

RenderField.propTypes = {
  onOwnerBlur: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export default RenderField;
