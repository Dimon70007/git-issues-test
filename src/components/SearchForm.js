import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { validateForm } from '../helpers';
import { RenderField, RenderCombobox } from './';
import { WidgetsLess } from '../styles';

const SearchForm = (props) => {
  const {
    styles,
    pristine,
    submitting,
    handleSubmit,
    onOwnerBlur,
    repos,
    reposLoaded,
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
            <Field
              name='repo'
              component={RenderCombobox}
              data={invalid ? [] : repos}
              invalid={invalid}
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
  reposLoaded: PropTypes.bool,
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
