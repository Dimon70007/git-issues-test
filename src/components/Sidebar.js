import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar as styles } from '../styles';
import SidebarItem from './SidebarItem';

const Sidebar = (props) => {
  const items = props.children;
  return (
    <div className={styles.container}>
      <ul>
        {items.map(item =>
          <SidebarItem key={item.id || item.number || item.title} value={item.toString()} />,
        )}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Sidebar;
