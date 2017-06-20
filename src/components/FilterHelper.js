import React from 'react';
import PropTypes from 'prop-types';
import { Combobox, DropdownList } from 'react-widgets';
import { SettingsCss } from '../styles';
import { AVAILABLE_FILTERS, V_FILTER_ACTIONS } from '../constants';

const FilterComponent = (props) => {
  const filter = props.filterState;
  // {
  //   key: '',
  //   value: '',
  // };
  // const setPerPage = (event) => {
  //   const value = event.target.value;
  //   props.onPerPageChange({ per_page: value });
  // };
  const setKey = event => (props.setKey(event.target.value));
  const setValue = event => (props.addValueToInput(event.target.value));
  const filterKeys = Object.keys(props.filterOptions);
  const filterValues = key => props.filterOptions[key];
  const applyFilter = event => props.changeFilter[event.target.value](filter);
  return (
    <div className={SettingsCss.container}>
      <Combobox
        data={filterKeys}
        value={filter.key}
        onSelect={setKey}
        placeholder={'input property\'s name'}
      />
      <Combobox
        data={filterValues(filter.key)}
        onSelect={setValue}
        value={filter.value}
        placeholder={'input property\'s value'}
      />
      <input type='text' value={filter.value} onChange={props.onInputChange} />
      <DropdownList
        data={V_FILTER_ACTIONS}
        placeholder='choise filter action'
        onSelect={applyFilter}
      />
    </div>
  );
};

FilterComponent.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf(
    PropTypes.string,
  ),
  filterState: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  }),
};

export default FilterComponent;
