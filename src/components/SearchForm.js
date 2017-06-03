import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, blur, submit } from 'redux-form';
import { Combobox } from 'react-widgets';
import validateForm from '../reducers/validateForm';
import RenderField from './RenderField';
import { WidgetsLess } from '../styles';

const renderCombobox = ({ input, field, label, meta: { touched, error }, ...rest }) =>
  (<div>
    <Combobox
      {...input}
      value={input.value}
      placeholder={input.name}
      onBlur={input.onBlur}
      {...rest}
    />
    {touched &&
      ((error && <span style={{ color: '#999' }}>{error}</span>)
          // || (warning && <span>{warning}</span>)
      )}
  </div>);

const SearchForm = (props) => {
  const { styles,
    pristine,
    submitting,
    handleSubmit,
    invalid,
  } = props;
  return (
    <div className={styles.form} >
      <form onSubmit={handleSubmit}>
        <div>
          <div className={WidgetsLess.wrap}>
            <Field containerClass='rw-widget' className='rw-input' name='owner' type='text' component={RenderField} label='owner' />
            {/* <Field name='repo' component={RenderField} type='text' label='repo' /> */}
            <Field
              name='repo'
              component={renderCombobox}
              data={['repo1', 'repo2', 'repo3', 'repo4', 'redux-app1']}
              required
              filter='startsWith'
              onSelect={(value) => {
                props.change('repo', value);
                console.log('value ', value);
                props.submit('leftSearch');
              }}
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
  handleSubmit: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};
export default reduxForm({
  validate: validateForm,
  changeField: (field, value) => {
    blur('leftSearch', field, value);
  },
})(SearchForm);
