import React from 'react';
import PropTypes from 'prop-types';

let shouldLoad = true;

const RenderField = ({
  input,
  className,
  containerClass,
  onOwnerBlur,
  meta: { touched, error /* , warning */},
  }) => (
    <div>
      <div className={containerClass}>
        <input
          {...input}
          className={className}
          placeholder={input.name}
          type='text'
          onChange={(event) => {
            input.onChange(event);
            if (!shouldLoad) {
              shouldLoad = true;
            }
          }}
          onBlur={(event) => {
            input.onBlur(event);
            if (!error && shouldLoad) {
              shouldLoad = false;
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
