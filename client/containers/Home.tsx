import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import io from 'socket.io-client';

function Home():JSX.Element {
  let socket = null;
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/api/authenticate')
    .then(res => res.json())
    .then(authenticated => {
      if(!authenticated) {
        navigate('/login');
      } else {
        socket = io();
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