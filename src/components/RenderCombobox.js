import React from 'react';
import PropTypes from 'prop-types';
import { Combobox } from 'react-widgets';

function RenderCombobox({ input, invalid, reposLoaded, meta, ...rest }) {
  return (<div>
    <Combobox
      {...input}
      busy={!invalid && meta.active && !reposLoaded}
      placeholder={input.name}
      {...rest}
    />
    {meta.touched &&
      ((meta.error && <span style={{ color: '#999' }}>{meta.error}</span>)
          // || (warning && <span>{warning}</span>)
      )}
  </div>);
}

RenderCombobox.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  invalid: PropTypes.bool,
  reposLoaded: PropTypes.bool,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    error: PropTypes.bool,
    touched: PropTypes.bool,
  }),
};

export default RenderCombobox;
