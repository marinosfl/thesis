import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
    {...rest}
  />
);

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
