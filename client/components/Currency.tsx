import React from 'react';

import Mora from '../assets/mora.png';
import Wish from '../assets/wish.png';

function Currency({account}): JSX.Element {
  return (
    <>
      <div className="nav-icon">
        <img src={Mora} />
        <span className="amount">
          {account.mora}
        </span>
      </div>
      <div className="nav-icon">
        <img src={Wish} />
        <div id="progress-hold">
          <img src={Wish} id="wish-progress"/>
        </div>
        <span className="amount">
          {account.wishes && account.wishes.amount}
        </span>
      </div>
    </>
  )
}

export default Currency;