import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";
import NavBar from "../components/NavBar";
import { authenticate } from "../actions/asyncActions";

import './stylesheets/NotFound.scss';

const mapStateToProps = (state) => ({
  account: state.account
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate())
});

function NotFound({account, authenticate}):JSX.Element {
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
    <div className="not-found">
      <NavBar current="home"/>
      <main>
        <h1>You seem to be lost</h1>
      </main>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);