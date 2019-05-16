import React from 'react';
import PropTypes from 'prop-types';

import './CurrentAction.scss';

const CurrentAction = ({ action }) => {
  return (
    <>
      <div className="actions__current--title">{action.title}</div>
      <div className="actions__current--description">{action.description}</div>
    </>
  );
};

CurrentAction.propTypes = {
  action: PropTypes.object.isRequired
};

export default CurrentAction;
