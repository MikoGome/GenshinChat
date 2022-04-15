import React, {useEffect} from 'react';
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

  useEffect(() => {
    authenticate();
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
          <button id="gacha-button" className="shop-button slow-bubbling" onClick={startWish}>
            <img src={Wish} />
            Wish For A Character
          </button>
          <button id="mora-button" className="shop-button slow-bubbling">
            <img src={Mora} />
            Spend Your Mora
          </button>
        </div>
        <div className="shop-keeper">
          <img onLoad={(e:any) => e.target.classList.add('shop-keeper-appear')} src={Paimon}/>
        </div>
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);