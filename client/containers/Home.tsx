import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { connect } from "react-redux";
import NavBar from '../components/NavBar';
import Chat from '../components/chat/Chat';

import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  account: state.account
});

const mapDispatchToProps = (dispatch) => ({
  initialize: (payload) => dispatch(actions.initialize(payload)),
});

function Home(props): JSX.Element {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/authenticate')
    .then(res => res.json())
    .then(data => {
      if(!data.authenticated) return navigate('/login');
      fetch('/api/account/initialize')
        .then(res => res.json())
        .then(possession => {
          props.initialize({...data.account, ...possession});
          const socket = io();
          socket.emit('signIn', data.account);
          setSocket(socket);
        })
    });
  }, []);

  return (
    <>
      <NavBar socket={socket}/>
      <Chat />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);