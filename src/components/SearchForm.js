import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';

const makePath = (...params) =>
  path.resolve(...params).toString();
// function validation(values) {
//   const errors = {};
//   const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
//   if (!emailPattern.test(values.email)) {
//     errors.email = 'Enter a valid email';
//   }
//
//   return errors;
// }
const SearchForm = (props) => {
  const prefix = props.prefix || '';
  const postfix = props.postfix || '';
  let repo = '';
  let owner = '';

  const onSubmit = (event) => {
    event.preventDefault();
    // ToDo validation
    if (!owner.value || !repo.value) {
      return;
    }
    const gitPath = makePath(prefix, owner.value, repo.value, postfix);
    props.onSearch(gitPath);
  };

  return (<div>
    <form className={props.styles.form} onSubmit={onSubmit}>
      <legend>Search</legend>
      <input
        type='text'
        name='owner'
        defaultValue=''
        placeholder='owner'
        ref={input => (owner = input)}
      />
      <input
        type='text'
        name='repo'
        defaultValue=''
        placeholder='repo'
        ref={input => (repo = input)}
      />
      <button type='submit'>Search issues</button>
    </form>
  </div>);
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
};

export default SearchForm;
