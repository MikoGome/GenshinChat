import React from 'react';
import NavBar from '../components/NavBar';
import './stylesheets/Shop.scss';
import Paimon from '../assets/paimon.png';
import Mora from '../assets/mora.png';
import Wish from '../assets/wish.png';

function Shop():JSX.Element {

  return (
    <div className="shop">
      <NavBar current="shop"/>
      <main>
        <div className="selection">
          <button id="gacha-button" className="shop-button">
            <img src={Wish} />
            Wish For A Character
          </button>
          <button id="mora-button" className="shop-button">
            <img src={Mora} />
            Spend Your Mora
          </button>
        </div>
        <div className="shop-keeper">
          <img className="floating" src={Paimon}/>
        </div>
      </main>
    </div>
  )
}

export default Shop;