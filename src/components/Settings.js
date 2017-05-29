import React from 'react';
import PropTypes from 'prop-types';
import { SettingsCss } from '../styles';

const createOptions = numsList =>
  numsList.map(num =>
    (<option className={SettingsCss.item} key={num} value={num} >{num}</option>));

const Settings = (props) => {
  const setPerPage = (event) => {
    const value = event.target.value;
    props.onPerPageChange({ per_page: value });
  };
  return (
    <div className={SettingsCss.container}>
      <label htmlFor='select'>
        elements on page
      </label>
      <select
        value={props.perPage}
        onChange={setPerPage}
      >
        {createOptions(props.perPageList)}
      </select>
    </div>
  );
};

Settings.propTypes = {
  perPage: PropTypes.number.isRequired,
  perPageList: PropTypes.arrayOf(PropTypes.number.isRequired),
  onPerPageChange: PropTypes.func.isRequired,
};

export default Settings;
