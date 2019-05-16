import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadActions } from '../../actions/actions';

const Actions = ({ actions, loading, loadActions }) => {
  useEffect(() => {
    loadActions();
  }, []);

  useEffect(() => {
    if (actions) {
      console.log(actions);
    }
  }, [actions]);

  return (
    <div className="container">
      test
      <ul>
        {!loading &&
          actions.map(action => <li key={action._id}>{action.title}</li>)}
      </ul>
    </div>
  );
};

Actions.propTypes = {
  actions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadActions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  actions: state.actions.actions,
  loading: state.actions.loading
});

export default connect(
  mapStateToProps,
  { loadActions }
)(Actions);
