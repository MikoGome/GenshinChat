import React, {useEffect} from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearSession } from "../actions/asyncActions";

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(clearSession())
});

function NavBar({account, signOut}) {
  const navigate = useNavigate();

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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);