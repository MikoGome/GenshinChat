import React, {useRef} from 'react';

import Mora from '../assets/mora.png';
import Wish from '../assets/wish.png';

import {sfx} from '../assets/preload';

function Currency({account}): JSX.Element {
  const progress = useRef<HTMLDivElement>();

  function showProgress() {
    //16 - 100 //84-empty
    
    const wishProg = account.wishes.progress / 100;
    const full = 68;
    const displayProg = (84 - full * wishProg);
    sfx(9);
    progress.current.style.transitionTimingFunction = 'ease-out';
    progress.current.style.height = displayProg + '%';
    
  }

  function hideProgress() {
    progress.current.style.transitionTimingFunction = 'ease-in';
    progress.current.style.height = 16 + '%';
  }

  return (
    <>
      <div className="nav-icon">
        <img src={Mora} />
        <span className="amount">
          {account.mora}
        </span>
      </div>
      <div className="nav-icon" onMouseEnter={showProgress} onMouseLeave={hideProgress} title={`${account.wishes.progress}%`}>
        <img src={Wish} />
        <div id="progress-hold" ref={progress}>
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