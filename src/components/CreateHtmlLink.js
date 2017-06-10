import React from 'react';
import PropTypes from 'prop-types';

const CreateHtmlLink = ({ url = '', anckhor = '', title = '' }) => (
  <a href={url} target='_blank' rel='noopener noreferrer' title={title}>
    {anckhor}
  </a>
);

CreateHtmlLink.propTypes = {
  url: PropTypes.string,
  anckhor: PropTypes.oneOfType([
    PropTypes.string,
    // PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.string,
};

export default CreateHtmlLink;
