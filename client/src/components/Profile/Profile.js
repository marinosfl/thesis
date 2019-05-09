import React, { useState, useEffect, useContext } from 'react';

import Context from '../../context';
// import classNames from 'classnames';

import UserInfo from './UserInfo/UserInfo';
import UserActions from './UserActions/UserActions';

import './Profile.scss';

export default function Profile() {
  const { state } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.currentUser) {
      setIsLoading(false);
    }
  }, [state.currentUser]);

  return (
    <div className="container">
      {isLoading ? (
        'Loading'
      ) : (
        <>
          <UserInfo user={state.currentUser} />
          <UserActions userId={state.currentUser._id} />
        </>
      )}
    </div>
  );
}
