import React from 'react';
import './Error.scss';

import PropTypes from 'prop-types';

const Error = ({ errors }) => {
  return (
    <ul className="errors">
      {errors.map(error => (
        <li key={error.id} className="error">
          {error.message}
        </li>
      ))}
    </ul>
  );
};

Error.propTypes = {
  errors: PropTypes.array.isRequired
};

export default Error;
