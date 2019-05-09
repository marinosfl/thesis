import React from 'react';

import ActionAvatar from './ActionAvatar/ActionAvatar';
import ActionDate from './ActionDate/ActionDate';
import ActionTitle from './ActionTitle/ActionTitle';

import './Action.scss';

export default function Action({ actionData }) {
  actionData.start_date = '13/2/1999';
  actionData.end_date = '29/7/2000';
  return (
    <div className="action">
      <ActionAvatar />
      <div className="action__counter" />
      <div>
        <ActionTitle title={actionData.title} />
        <ActionDate
          start_date={actionData.start_date}
          end_date={actionData.end_date}
        />
      </div>
    </div>
  );
}
