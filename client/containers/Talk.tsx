import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';

import NavBar from '../components/NavBar';
import Chat from '../components/chat/Chat';
import Avatar from '../components/Avatar';
import Partner from '../components/talk/Partner';

import './stylesheets/Talk.scss';

const mapStateToProps = (state) => ({
  account: state.account,
  page: state.page
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate())
});


function Talk({account, authenticate}): JSX.Element {
  
  const navigate = useNavigate();

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
  }, [account.authenticated]);

  return(
    <div className="talk">
      <NavBar current="talk"/>
      <main>
      <Partner />
        <Chat />
      <Avatar />
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Talk);