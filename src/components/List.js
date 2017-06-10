import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  const { items, RenderChild, itemClass, containerClass } = props;
  const dataList = items.length && items.map(item =>
      (<li key={item.id}>
        <RenderChild {...props} item={item} className={itemClass} />
      </li>
  ));
  return (
    <div className={containerClass.container}>
      <ul>
        {dataList || null}
      </ul>
    </div>
  );
};

List.propTypes = {
  RenderChild: PropTypes.func.isRequired,
  itemClass: PropTypes.object.isRequired,
  containerClass: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default List;
