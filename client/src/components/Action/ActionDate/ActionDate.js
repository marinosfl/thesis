import React from 'react';

export default function ActionDate({ start_date, end_date }) {
  return (
    <div className="action__date">
      <div className="action__date--start">Έναρξη: {start_date}</div>
      <div className="action__date--end">Λήξη: {end_date}</div>
    </div>
  );
}
