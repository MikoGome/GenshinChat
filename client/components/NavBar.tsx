import React from "react";
import Tab from './Tab';
import { useNavigate } from "react-router-dom";

function NavBar({socket}) {
  const navigate = useNavigate();
  const navBarTabs = ['Shop', 'Friends', 'Talks', 'Profile', 'Logout'];

  const tabs = navBarTabs.map((el) => {
    return <Tab key={'Tab_' + el} section={el} />
  });

  function logOut() {
    socket.disconnect();
    navigate('/login');
  }

  return (
    <nav>
      <ul>
        {tabs}
      </ul>
    </nav>
  )
}

export default NavBar;