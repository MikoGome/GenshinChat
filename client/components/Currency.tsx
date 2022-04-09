import React from 'react';

import Mora from '../assets/mora.png';
import Wish from '../assets/wish.png';

function Currency({account}): JSX.Element {
  return (
    <>
      <div className="nav-icon">
        <img src={Mora} />
        {account.mora}
      </div>
      <div className="nav-icon">
        <img src={Wish} />
        {account.wishes && account.wishes.amount}
      </div>
    </>
  )
}

export default Currency;