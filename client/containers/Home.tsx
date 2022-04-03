import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import io from 'socket.io-client';

function Home():JSX.Element {
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
  }, [])
  return (
    <>
      <h1>Home</h1>
      <Link to='/login'>Login</Link>
    </>
  );
}

export default Home;