import React from 'react';

import './Home.scss';

export default function Home() {
  return (
    <section className="take-part">
      <div className="container">
        <div>
          Επόμενη Ψηφοφορία: <span>17:05:44</span>
        </div>
        <div>
          <div>
            Υπόβαλε την ιδέα σου,
            <span>Βελτίωσε τον τοπο σου!</span>
          </div>
          <button>Υποβολή</button>
        </div>
      </div>
    </section>
  );
}
