import React from 'react';
// import PropTypes from 'prop-types';
// import path from 'path';

// const makePath = (...params) =>
//   path.resolve(...params).toString();
// function validation(values) {
//   const errors = {};
//   const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
//   if (!emailPattern.test(values.email)) {
//     errors.email = 'Enter a valid email';
//   }
//
//   return errors;
// }

var SearchForm = function SearchForm(props) {
  var prefix = props.prefix || '';
  var postfix = props.postfix || '';
  // let repo = '';
  // let owner = '';

  // const onSearch = (event) => {
  //   event.preventDefault();
  // ToDo validation
  // if (!owner.value || !repo.value) {
  //   return;
  // }
  // const gitPath = makePath(prefix, owner.value, repo.value, postfix);
  // props.onSearch(gitPath);
  // console.log('gitPath');
  // };

  return React.createElement('div', null);
};
// {/* <form className={props.styles.form} onSubmit={onSearch}>
//   <legend>Search</legend>
//   <input
//     type='text'
//     name='owner'
//     defaultValue=''
//     placeholder='owner'
//     ref={input => (owner = input)}
//   />
//   <input
//     type='text'
//     name='repo'
//     defaultValue=''
//     placeholder='repo'
//     ref={input => (repo = input)}
//   />
//   <button type='submit'>Search issues</button>
// </form> */}
// SearchForm.propTypes = {
//   // onSearch: PropTypes.func.isRequired,
//   // styles: PropTypes.object.isRequired,
//   prefix: PropTypes.string,
//   postfix: PropTypes.string,
// };

export default SearchForm;
//# sourceMappingURL=/home/otvazhniy/jsProjects/git-issues-test/maps/components/SearchForm.js.map