import React from 'react';
import PropTypes from 'prop-types';
import Map from '../../Map/Map';
import './CurrentAction.scss';

const CurrentAction = ({ action }) => {
  return (
    <>
      <div className="actions__current--title">{action.title}</div>
      <div className="actions__current--description">{action.description}</div>
      <Map longitude={action.longitude} latitude={action.latitude} />
    </>
  );
};

CurrentAction.propTypes = {
  action: PropTypes.object.isRequired
};

export default CurrentAction;
