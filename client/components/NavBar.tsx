import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar({socket}) {
  const navigate = useNavigate();

  function logOut() {
    console.log('hi');
    fetch('/api/logout')
      .then(() => {
        socket.disconnect()
        navigate('/login');
      })
  }

  return (
    <nav>
      <ul>
        <li>Shop</li>
        <li>Friends</li>
        <li>Talks</li>
        <li>Profile</li>
        <li onClick={logOut}>Logout</li>
      </ul>
    </nav>
  )
}

export default NavBar;