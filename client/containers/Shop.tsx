import React, {useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { prize } from '../actions/actions';
import { authenticate, wish } from '../actions/asyncActions';
import NavBar from '../components/NavBar';
import './stylesheets/Shop.scss';
import Paimon from '../assets/paimon.png';
import Mora from '../assets/mora.png';
import Wish from '../assets/wish.png';
import pictures from '../assets/preload';
import { portrait } from '../utils/helperFunctions';
import './stylesheets/Shop.scss';

import {sfx} from '../assets/preload';

const mapStateToProps = (state) => ({
  account: state.account,
  prize: state.characters.prize,
  amount: state.characters.amount
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
  wish: (acc) => dispatch(wish(acc)),
  updatePrize: () => dispatch(prize(''))
});

function Shop({account, amount, authenticate, prize, updatePrize, wish}):JSX.Element {

  const navigate = useNavigate();

  const shopKeeper:React.MutableRefObject<HTMLDivElement> = useRef();
  const gachaButton:React.MutableRefObject<HTMLButtonElement> = useRef();
  const moraButton:React.MutableRefObject<HTMLButtonElement> = useRef();
  const wishImg: React.MutableRefObject<HTMLImageElement> = useRef();

  useEffect(() => {
    authenticate();
    shopKeeper.current.classList.remove('hide');
    sfx(11);
    const buttonAnimationDelay = 250;

    setTimeout(() => {
      gachaButton.current.classList.add('slow-bubbling');
      gachaButton.current.classList.remove('hide');
      sfx(9, 0.15);
    }, buttonAnimationDelay);
    setTimeout(() => {
      moraButton.current.classList.add('slow-bubbling');
      moraButton.current.classList.remove('hide');
      sfx(9, 0.15);
    }, buttonAnimationDelay * 2);
  }, []);

  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    } else if(account.authenticated === 'exists') {
      navigate('/exists');
    }
  }, [account.authenticated]);

  function startWish():void {
    const {possession, characters_owned, wishes} = account;

    if(wishes.amount - 1 >= 0 && amount - account.characters_owned.length > 0) {
      sfx(10);
      wish({possession, characters_owned, wishes});
    }
    else {
      sfx(4);
      wishImg.current.classList.remove('shake');
      void wishImg.current.offsetWidth;
      wishImg.current.classList.add('shake');
    };
  }

  const prizeChar = useRef<HTMLImageElement>();
  
  function closureClick(time:number):()=>void {
    let counter = 0;
    setTimeout(() => counter++, time);

    return function ():void {
      counter++;
      if(counter === 1) {
        prizeChar.current.classList.add('skip-prize-animate');
      } else {
        updatePrize();
      }
    }
  }

  const handlePrizeClick = closureClick(2000);

  function backup() {
    prizeChar.current.src= portrait(prize, 'female');
  }

  function appear() {
    prizeChar.current.classList.add('prize-animate');
  }

  return (
    <div className="shop">
      <NavBar current="shop"/>
      <main>
        <div className="selection">
          <button id="gacha-button" className="shop-button hide" onClick={startWish} ref={gachaButton}>
            <img src={Wish} ref={wishImg} />
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
        {prize && (
          <div className="prize" onClick={handlePrizeClick}>
            <img src={pictures[prize]?.gachaSplash} onError={backup} onLoad={appear} ref={prizeChar}/>
          </div>
        )}
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);