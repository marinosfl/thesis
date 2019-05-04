import React, { useEffect, useState } from 'react';

import { useClient } from '../../../client';
import { ME_ACTIONS_QUERY } from '../../../graphql/queries';

export default function UserActions({ userId }) {
  const client = useClient();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    // fetching actions of current user
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const { meActions } = await client.request(ME_ACTIONS_QUERY, {
        authorId: userId
      });
      if (meActions) setActions(meActions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {actions.map(action => {
        return <div key={action._id}>{action.title}</div>;
      })}
      actions
    </div>
  );
}
