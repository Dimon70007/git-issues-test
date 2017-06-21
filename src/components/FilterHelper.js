import React from 'react';
import PropTypes from 'prop-types';
import { DropdownList } from 'react-widgets';

const FilterHelper = ({ addValueToInput, availableKeys = [] }) => {
  const clearHelper = () => '';
  return (
    <DropdownList
      data={availableKeys}
      isRtl={false}
      value='add option like prop:word1_word2'
      onSelect={addValueToInput}
      onChange={clearHelper}
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
