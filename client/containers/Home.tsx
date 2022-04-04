import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

import NavBar from '../components/NavBar';

function Home(): JSX.Element {
  let socket = null;
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/api/authenticate')
    .then(res => res.json())
    .then(data => {
      if(!data.authenticated) {
        navigate('/login');
      } else {
        socket = io();
        socket.emit('signIn', data.account);
      }
    });
  }, []);

  return (
    <>
      <NavBar />
    </>
  );
}

export default Home;