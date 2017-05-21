import React from 'react';
import PropTypes from 'prop-types';
import IssueItem from './IssueItem';
import { IssuesListCss } from '../styles';

const IssuesList = (props) => {
  const items = props.children;
  const dataList = items.length && items.map(item =>
      (<li key={item.id}>
        <IssueItem issue={item} pathname={props.pathname} />
      </li>
  ));
  return (
    <div className={IssuesListCss.container}>
      <ul>
        {dataList || null}
      </ul>
    </div>
  );
};

IssuesList.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ),
  pathname: PropTypes.string.isRequired,
};

export default IssuesList;
