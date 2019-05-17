import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadActions, loadAction } from '../../actions/actions';

import CurrentAction from './CurrentAction/CurrentAction';

import './Actions.scss';

const Actions = ({
  actions,
  currentAction,
  loading,
  loadActions,
  loadAction
}) => {
  useEffect(() => {
    loadActions();
  }, []);

  const handleClick = event => {
    const id = event.target.getAttribute('data-id');
    loadAction(id);
  };

  return (
    <div className="container actions">
      <ul className="actions__list">
        {!loading &&
          actions.map(action => (
            <li
              key={action._id}
              data-id={action._id}
              className="actions__action"
              onClick={handleClick}
            >
              {action.title}
            </li>
          ))}
      </ul>
      <div className="actions__current">
        {currentAction && <CurrentAction action={currentAction} />}
      </div>
    </div>
  );
};

Actions.propTypes = {
  actions: PropTypes.array,
  currentAction: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  loadActions: PropTypes.func.isRequired,
  loadAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  actions: state.actions.actions,
  currentAction: state.actions.currentAction,
  loading: state.actions.loading
});

export default connect(
  mapStateToProps,
  { loadActions, loadAction }
)(Actions);
