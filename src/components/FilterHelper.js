import React from 'react';
import PropTypes from 'prop-types';
import { DropdownList } from 'react-widgets';

const FilterHelper = ({ addValueToInput, availableKeys = [] }) => {
  const addToInput = event => addValueToInput(event.target.value);
  return (
    <DropdownList
      data={availableKeys}
      placeholder='add option'
      onSelect={addToInput}
    />
  );
};

FilterHelper.propTypes = {
  addValueToInput: PropTypes.func.isRequired,
  availableKeys: PropTypes.arrayOf(
      PropTypes.string,
  ),
};

export default FilterHelper;
