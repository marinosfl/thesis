import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => {
  return (
    <Route
      render={props => {
        if (!isAuthenticated && !loading) {
          return <Redirect to="/login" />;
        } else if (isAuthenticated && !loading && user.role !== 'admin') {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
