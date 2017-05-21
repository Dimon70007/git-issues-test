import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const container = props.classWrapper.container || {};
  const element = props.classWrapper.element || {};
  const messages = props.messages.map(mes => (
    <li key={mes.id} className={element}>
      {mes.message}
    </li>
  ));
  console.log(messages);
  return (<div className={container}>
    <h2 className={element}>{props.type}</h2>
    <ul>
      {messages}
    </ul>
  </div>);
};

ErrorMessage.propTypes = {
  type: PropTypes.string.isRequired,
  classWrapper: PropTypes.shape({
    container: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
  }),
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ),
};

export default ErrorMessage;
