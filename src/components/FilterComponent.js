import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropdownList } from 'react-widgets';
import FilterHelper from './FilterHelper';
import { changeFilter, vFilterState } from '../actions';
import { WidgetsLess, FilterComponentCss } from '../styles';
import { V_FILTER_ACTIONS, V_FILTER_STATE, AVAILABLE_FILTERS } from '../constants';

const FilterComponent = ({ filterInputValue = '', onFilterInputChange, changeFltr, availableKeys = [] }) => {
  const applyFilterAction = actionType => changeFltr(actionType)(filterInputValue);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applyFilterAction(V_FILTER_ACTIONS[0]);
    }
  };
  const onInputChange = event => onFilterInputChange(event.target.value);
  const addToInput = value => onFilterInputChange(`${filterInputValue} ${value}`);
  const availableFilters = [...AVAILABLE_FILTERS, ...availableKeys.map(item => `${item}:`)];

  return (
    <div className={`${WidgetsLess.wrap} ${FilterComponentCss.container}`}>
      <FilterHelper
        addValueToInput={addToInput}
        availableKeys={availableFilters}
      />
      <div className='rw-widget'>
        <input
          className='rw-input'
          type='text'
          name='filterInput'
          value={filterInputValue}
          placeholder='prop:val otherProp:otherVal'
          onChange={onInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <DropdownList
        data={V_FILTER_ACTIONS}
        defaultValue={'filter\'s actions'}
        onSelect={applyFilterAction}
      />
    </div>
  );
};

FilterComponent.propTypes = {
  availableKeys: PropTypes.arrayOf(
      PropTypes.string,
  ),
  changeFltr: PropTypes.func.isRequired,
  filterInputValue: PropTypes.string,
  onFilterInputChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filterInputValue: state[V_FILTER_STATE].textFieldValue,
});

const mapDispatchToProps = dispatch => ({
  changeFltr: actionType =>
    bindActionCreators(changeFilter(actionType), dispatch),
  onFilterInputChange: value => dispatch(vFilterState({ textFieldValue: value })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
