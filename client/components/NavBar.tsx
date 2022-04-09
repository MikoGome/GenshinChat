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
      focusLine.current.style.transition = 'none';
      focusLine.current.style.left = x + 'px';
      focusLine.current.style.width = width + 'px';
    }
    currPage.classList.add('current');
    const navTabs = document.getElementsByClassName('clickable');
    for(let i = 0; i < navTabs.length; i++) {
      navTabs[i].addEventListener('mouseenter', (e:any) => {
        focusLine.current.style.transition = 'all 0.25s';
        const {x, width} = e.currentTarget.getBoundingClientRect();
        if(focusLine.current) {
          focusLine.current.style.left = x + 'px';
          focusLine.current.style.width = width + 'px';
        }
      });

      if(navTabs[i].id === current) continue;
      navTabs[i].classList.add('transition');
    }
    if(navBar.current) {
      navBar.current.addEventListener('mouseleave', (e:any) => {
        const {x, width} = currPage.getBoundingClientRect();
        if(focusLine.current) {
          focusLine.current.style.left = x + 'px';
          focusLine.current.style.width = width + 'px';
        }
      });
    }

  }, []);

  function redirect(e) {
    const target = e.currentTarget.id;
    if(target === current) return;
    const route = target === 'home' ? '' : target;
    navigate('/' + route);
  }

  return (
    <nav className="nav-bar">
      <ul ref={navBar}>
        <li><img className="logo" src={GenshinLogo}/></li>
        <li id="home" className="clickable" onClick={redirect}><Home/>Home</li>
        <li id="shop" className="clickable" onClick={redirect}><LocalGroceryStore/>Shop</li>
        <li id="friends" className="clickable" onClick={redirect}><PeopleAlt/>Friends</li>
        <li id="talks" className="clickable" onClick={redirect}><Chat/>Talks</li>
        <li id="profile" className="clickable" onClick={redirect}><AccountBox/>Profile</li>
        <li id="logout" className="clickable" onClick={signOut}><Logout/>Log Out</li>
        <li id="currency">
          <Currency account={account} />
        </li>
        <span id="focus-line" ref={focusLine}></span>
      </ul>
    </nav>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);