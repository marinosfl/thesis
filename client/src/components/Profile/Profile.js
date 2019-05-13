import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';

// import classNames from 'classnames';

import UserInfo from './UserInfo/UserInfo';
import UserActions from './UserActions/UserActions';

import './Profile.scss';

const Profile = ({ getCurrentProfile, profile, loading }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div className="container">
      {loading ? (
        'Loading'
      ) : (
        <>
          <UserInfo user={profile} />
          <UserActions userId={profile._id} />
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
