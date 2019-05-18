import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadActions } from '../../../actions/actions';

import Action from '../../Action/Action';

const UserActions = ({ userId, actions, loadActions }) => {
  useEffect(() => {
    loadActions(userId);
  }, []);

  return (
    <div>
      {actions.map(action => {
        return <Action key={action._id} actionData={action} />;
      })}
      actions
    </div>
  );
};

UserActions.propTypes = {
  loadActions: PropTypes.func.isRequired,
  actions: PropTypes.array
};

const mapStateToProps = state => ({
  actions: state.actions.actions
});

export default connect(
  mapStateToProps,
  { loadActions }
)(UserActions);
