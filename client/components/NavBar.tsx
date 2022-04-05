import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../actions/actions";

const mapDispatchToProps = dispatch => ({
  logOut: dispatch(logOut())
});

function NavBar({socket, logOut}) {
  const navigate = useNavigate();

  function signOut() {
    fetch('/api/logout')
      .then(() => {
        socket.disconnect();
        logOut();
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
        <li onClick={signOut}>Logout</li>
      </ul>
    </nav>
  )
}

export default connect(null, mapDispatchToProps)(NavBar);