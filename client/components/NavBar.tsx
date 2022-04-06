import React from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearSession } from "../actions/asyncActions";

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(clearSession())
});

function NavBar({signOut}) {
  const navigate = useNavigate();

  // function signOut() {
  //   fetch('/api/logout')
  //   .then(() => {
  //     account.socket.disconnect();
  //     logOut();
  //     navigate('/login');
  //   });
  // }

  return (
    <nav>
      <ul>
        <li>Shop</li>
        <li>Friends</li>
        <li>Talks</li>
        <li>Profile</li>
        <li onClick={signOut}><Link to='/login'>Logout</Link></li>
      </ul>
    </nav>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);