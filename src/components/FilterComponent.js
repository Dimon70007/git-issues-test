import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropdownList } from 'react-widgets';
import { changeFilter, vFilterState } from '../actions';
import { WidgetsLess, FilterComponentCss } from '../styles';
import { V_FILTER_ACTIONS, V_FILTER_STATE } from '../constants';

const FilterComponent = (props) => {
  const { filterInputValue, onFilterInputChange } = props;
  const applyFilterAction = actionType => props.changeFilter(actionType)(filterInputValue);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applyFilterAction(V_FILTER_ACTIONS[0]);
    }
  };
  return (
    <div className={`${WidgetsLess.wrap} ${FilterComponentCss.container}`}>
      <div className='rw-widget'>
        <input
          className='rw-input'
          type='text'
          name='filterInput'
          value={filterInputValue}
          placeholder='prop:val otherProp:otherVal'
          onChange={onFilterInputChange}
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
  changeFilter: PropTypes.func.isRequired,
  filterInputValue: PropTypes.string,
  onFilterInputChange: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  filterInputValue: state[V_FILTER_STATE].textFieldValue,
});
const mapDispatchToProps = dispatch => ({
  changeFilter: actionType =>
    bindActionCreators(changeFilter(actionType), dispatch),
  onFilterInputChange: event => dispatch(vFilterState({ textFieldValue: event.target.value })),
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
