import React, {useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';
import NavBar from '../components/NavBar';
import './stylesheets/Shop.scss';
import Paimon from '../assets/paimon.png';
import Mora from '../assets/mora.png';
import Wish from '../assets/wish.png';
import { wish } from '../actions/asyncActions';

import './stylesheets/Shop.scss';

const mapStateToProps = (state) => ({
  account: state.account,
  page: state.page
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
  wish: (acc) => dispatch(wish(acc))
});

function Shop({account, authenticate, wish}):JSX.Element {

  const navigate = useNavigate();

  const shopKeeper:React.MutableRefObject<HTMLDivElement> = useRef();
  const gachaButton:React.MutableRefObject<HTMLButtonElement> = useRef();
  const moraButton:React.MutableRefObject<HTMLButtonElement> = useRef();

  useEffect(() => {
    authenticate();
    shopKeeper.current.classList.remove('hide');
    const buttonAnimationDelay = 250;
    setTimeout(() => {
      gachaButton.current.classList.add('slow-bubbling');
      gachaButton.current.classList.remove('hide');
    }, buttonAnimationDelay);
    setTimeout(() => {
      moraButton.current.classList.add('slow-bubbling');
      moraButton.current.classList.remove('hide');
    }, buttonAnimationDelay * 2);
  }, []);

  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
  }, [account.authenticated]);

  function startWish() {
    const {possession, characters_owned, wishes} = account;
    if(wishes.amount - 1 >= 0) wish({possession, characters_owned, wishes});
    else console.log('not enough wishes');
  }

  return (
    <div className="shop">
      <NavBar current="shop"/>
      <main>
        <div className="selection">
          <button id="gacha-button" className="shop-button hide" onClick={startWish} ref={gachaButton}>
            <img src={Wish} />
            <div>
              <p>Wish For A Character</p>
              <aside>Will consume 1 wish</aside>
            </div>
          </button>
          <button id="mora-button" className="shop-button hide" ref={moraButton}>
            <img src={Mora} />
            <div>
              <p>Spend Your Mora</p>
              <aside>Likely never coming LOL</aside>
            </div>
          </button>
        </div>
        <div className="shop-keeper hide" ref={shopKeeper}>
          <img onLoad={(e:any) => e.target.classList.add('shop-keeper-appear')} src={Paimon}/>
        </div>
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);