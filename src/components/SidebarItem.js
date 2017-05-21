import React from 'react';
import PropTypes from 'prop-types';
import { SidebarItem as styles } from '../styles';

const SidebarItem = props => (
  <li className={styles.container}>
    {props.value}
  </li>
  );

SidebarItem.propTypes = {
  value: PropTypes.string.isRequired,
};

export default SidebarItem;
