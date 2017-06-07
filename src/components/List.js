import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  const { children, RenderChild, itemClass, containerClass } = props;
  const dataList = children.length && children.map(item =>
      (<li key={item.id}>
        <RenderChild {...props} item={item} className={itemClass} />
      </li>
  ));
  return (
    <div className={containerClass}>
      <ul>
        {dataList || null}
      </ul>
    </div>
  );
};

List.propTypes = {
  RenderChild: PropTypes.node.isRequired,
  itemClass: PropTypes.object.isRequired,
  containerClass: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default List;
