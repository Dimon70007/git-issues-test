import React from 'react';
import PropTypes from 'prop-types';

const dateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const DateToLocale = ({ source, lang = 'en', options = {} }) => {
  const date = new Date(source);
  const newOptions = { ...dateOptions, options };
  return (
    <span>
      {date.toLocaleString(lang, newOptions)}
    </span>
  );
};

DateToLocale.propTypes = {
  source: PropTypes.string.isRequired,
  lang: PropTypes.string,
  options: PropTypes.object,
};

export default DateToLocale;
