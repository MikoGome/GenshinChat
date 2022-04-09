import React, {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import { connect } from "react-redux";
import { clearSession } from "../actions/asyncActions";
import Home from '@mui/icons-material/HomeRounded';
import LocalGroceryStore from '@mui/icons-material/LocalGroceryStoreRounded';
import PeopleAlt from '@mui/icons-material/PeopleAltRounded';
import Chat from '@mui/icons-material/ChatRounded';
import AccountBox from '@mui/icons-material/AccountBoxRounded';
import Logout from '@mui/icons-material/LogoutRounded';

import GenshinLogo from '../assets/genshin-home-logo.png';

import Currency from './Currency';

import './stylesheets/NavBar.scss';

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(clearSession())
});

function NavBar({account, current, signOut}) {

  const navigate = useNavigate();
  const focusLine = useRef();
  const navBar = useRef();

  useEffect(() => {
    const currPage = document.getElementById(current);
    const {x, width} = currPage.getBoundingClientRect();
    if(focusLine.current) {
      focusLine.current.style.left = x + 'px';
      focusLine.current.style.width = width + 'px';
    }
    currPage.classList.add('current');
    const navTabs = document.getElementsByClassName('clickable');
    for(let i = 0; i < navTabs.length; i++) {
      if(navTabs[i].id === current) continue;
      navTabs[i].classList.add('transition');
    }

  }, []);

  function redirect(e) {
    const target = e.currentTarget.id;
    if(target === current) return;
    const route = target === 'home' ? '' : target;
    navigate('/' + route);
  }

  function returnFocus(elCurrent:string):void {
    const currEl = document.getElementById(elCurrent);
    const {x, width} = currEl.getBoundingClientRect();
    if(focusLine.current) {
      focusLine.current.style.left = x + 'px';
      focusLine.current.style.width = width + 'px';
    }
  }
  
  function tempFocus(e:any):void {
    const {x, width} = e.currentTarget.getBoundingClientRect();
    if(focusLine.current) {
      focusLine.current.style.left = x + 'px';
      focusLine.current.style.width = width + 'px';
    }
  }

  return (
    <nav className="nav-bar">
      <ul onMouseLeave={() => returnFocus(current)} ref={navBar}>
        <li onMouseEnter={() => returnFocus(current)}><img className="logo" src={GenshinLogo}/></li>
        <li id="home" className="clickable"  onMouseEnter={tempFocus} onClick={redirect}><Home/>Home</li>
        <li id="shop" className="clickable" onMouseEnter={tempFocus} onClick={redirect}><LocalGroceryStore/>Shop</li>
        <li id="friends" className="clickable" onMouseEnter={tempFocus} onClick={redirect}><PeopleAlt/>Friends</li>
        <li id="talks" className="clickable" onMouseEnter={tempFocus} onClick={redirect}><Chat/>Talks</li>
        <li id="profile" className="clickable" onMouseEnter={tempFocus} onClick={redirect}><AccountBox/>Profile</li>
        <li id="logout" className="clickable" onMouseEnter={tempFocus} onClick={signOut}><Logout/>Log Out</li>
        <span id="focus-line" ref={focusLine}></span>
        <li id="currency" onMouseEnter={() => returnFocus(current)}>
          <Currency account={account} />
        </li>
      </ul>
    </nav>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);