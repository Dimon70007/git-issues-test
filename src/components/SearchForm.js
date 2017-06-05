import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Combobox } from 'react-widgets';
import { validateForm } from '../helpers';
import RenderField from './RenderField';
import { WidgetsLess } from '../styles';

function renderCombobox({ input, reposLoaded, meta, ...rest }) {
  return (<div>
    <Combobox
      {...input}
      busy={meta.visited && !reposLoaded}
      placeholder={input.name}
      {...rest}
    />
    {meta.touched &&
      ((meta.error && <span style={{ color: '#999' }}>{meta.error}</span>)
          // || (warning && <span>{warning}</span>)
      )}
  </div>);
}

const SearchForm = (props) => {
  const {
    styles,
    pristine,
    submitting,
    handleSubmit,
    onOwnerBlur,
    repos,
    reposLoaded,
    // change,
    submit,
    invalid,
  } = props;
  return (
    <div className={styles.form} >
      <form onSubmit={handleSubmit}>
        <div>
          <div className={WidgetsLess.wrap}>
            <Field
              containerClass='rw-widget'
              className='rw-input'
              name='owner'
              component={RenderField}
              onOwnerBlur={onOwnerBlur}
            />
            {/* <Field name='repo' component={RenderField} type='text' label='repo' /> */}
            <Field
              name='repo'
              component={renderCombobox}
              data={repos}
              required
              reposLoaded={reposLoaded}
              onSelect={(/* value*/) => {
                // props.change('repo', value);
                setTimeout(() => submit('leftSearch'));
              }}

              filter='startsWith'
            />
          </div>
        </div>
        <span className={styles.submit}>
          <button type='submit' disabled={submitting || pristine || invalid}>Search issues</button>
        </span>
      </form>
    </div>);
};

SearchForm.propTypes = {
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  repos: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  onOwnerBlur: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

export default reduxForm({
  validate: validateForm,
})(SearchForm);
