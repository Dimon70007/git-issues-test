import React from 'react';
import PropTypes from 'prop-types';
import FilterComponent from './FilterComponent';
import SettingsCss from '../styles/Settings.css';

const createOptions = numsList =>
  numsList.map(num =>
    (<option className={SettingsCss.item} key={num} value={num} >{num}</option>));

const Settings = (props) => {
  const setPerPage = (event) => {
    const value = event.target.value;
    props.onPerPageChange({ per_page: value });
  };
  return (
    <div className={SettingsCss.main}>
      <div className={SettingsCss.container}>
        <FilterComponent
          availableKeys={props.availableKeys}
        />
        <label htmlFor='select' className={SettingsCss.label} >
          elements on page
        </label>
        <select
          value={props.perPage}
          onChange={setPerPage}
        >
          {createOptions(props.perPageList)}
        </select>
      </div>
    </div>
  );
};

Settings.propTypes = {
  availableKeys: PropTypes.arrayOf(
      PropTypes.string,
  ),
  perPage: PropTypes.number.isRequired,
  perPageList: PropTypes.arrayOf(PropTypes.number.isRequired),
  onPerPageChange: PropTypes.func.isRequired,
};

export default Settings;
