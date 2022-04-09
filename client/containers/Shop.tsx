import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';
import NavBar from '../components/NavBar';
import './stylesheets/Shop.scss';
import Paimon from '../assets/paimon.png';
import Mora from '../assets/mora.png';
import Wish from '../assets/wish.png';

import './stylesheets/Shop.scss';

const mapStateToProps = (state) => ({
  account: state.account,
  page: state.page
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate())
});

function Shop({account, authenticate}):JSX.Element {

  const navigate = useNavigate();

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
  }, [account.authenticated]);

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

export default connect(mapStateToProps, mapDispatchToProps)(Shop);