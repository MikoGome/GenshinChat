import React, {useEffect} from "react";
import { connect } from "react-redux";
import { clearSession } from "../actions/asyncActions";
import Home from '@mui/icons-material/HomeRounded';
import LocalGroceryStore from '@mui/icons-material/LocalGroceryStoreRounded';
import PeopleAlt from '@mui/icons-material/PeopleAltRounded';
import Chat from '@mui/icons-material/ChatRounded';
import AccountBox from '@mui/icons-material/AccountBoxRounded';
import Logout from '@mui/icons-material/LogoutRounded';

import GenshinLogo from '../assets/genshin-home-logo.png';

import './stylesheets/NavBar.scss';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(clearSession())
});

function NavBar({signOut}) {

  return (
    <nav className="nav-bar">
      <ul>
        <li><img src={GenshinLogo}/></li>
        <li><Home/>Home</li>
        <li><LocalGroceryStore/>Shop</li>
        <li><PeopleAlt/>Friends</li>
        <li><Chat/>Talks</li>
        <li><AccountBox/>Profile</li>
        <li onClick={signOut}><Logout/>Log Out</li>
      </ul>
    </nav>
  )
}

export default connect(null, mapDispatchToProps)(NavBar);