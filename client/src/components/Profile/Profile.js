import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import classNames from 'classnames';

import UserInfo from './UserInfo/UserInfo';
import UserActions from './UserActions/UserActions';

import './Profile.scss';

const Profile = ({ user, loading }) => {
  return (
    <div className="container">
      {loading ? (
        'Loading'
      ) : (
        <>
          <UserInfo user={user} />
          <UserActions userId={user._id} />
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
