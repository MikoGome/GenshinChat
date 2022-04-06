import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from '../components/NavBar';
import Chat from '../components/chat/Chat';
import Avatar from '../components/Avatar';
import { authenticate } from "../actions/asyncActions";

const mapStateToProps = (state) => ({
  account: state.account
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate())
});

function Home(props): JSX.Element {
  const navigate = useNavigate();
  
  console.log(props.account);
   
  useEffect(() => {
    props.authenticate();
  }, []);

  useEffect(() => {
    if(props.account.authenticated === false) {
      navigate('/login');
    }
  }, [props.account.authenticated]);

  return (
    <>
      <NavBar />
      <Chat />
      <Avatar />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);