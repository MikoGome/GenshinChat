import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from '../components/NavBar';
import OnlineBar from '../components/OnlineBar';
import Chat from '../components/chat/Chat';
import Avatar from '../components/Avatar';
import { authenticate } from "../actions/asyncActions";

const mapStateToProps = (state) => ({
  account: state.account,
  page: state.page
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate())
});

function Home({account, page, authenticate, getUsers}): JSX.Element {
  const navigate = useNavigate();
  
  console.log(page);
  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
  }, [account.authenticated]);

  return (
    <>
      <NavBar />
      <OnlineBar users={page.users}/>
      <Chat />
      <Avatar />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);