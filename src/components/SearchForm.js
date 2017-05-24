import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import validateForm from '../reducers/validateForm';
import RenderField from '../components/RenderField';

const SearchForm = (props) => {
  const { styles,
    pristine,
    submitting,
    // reset,
    handleSubmit,
    invalid,
  } = props;

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <legend>Search. </legend>
        <Field name='owner' type='text' component={RenderField} label='owner' />
        <Field name='repo' component={RenderField} type='text' label='repo' />
        <div>
          <button type='submit' disabled={submitting || pristine || invalid}>Search issues</button>
          {/* <button
            type='button'
            disabled={pristine || submitting}
            onClick={reset}
          >Clear values</button> */}
        </div>
      </form>
    </div>);
};

SearchForm.propTypes = {
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  // reset: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

export default reduxForm({
  validate: validateForm,
})(SearchForm);
