import React, { useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './containers/Home';
import Login from './containers/Login';
import Shop from './containers/Shop';
import Friends from './containers/Friends';
import Talk from './containers/Talk';
import Profile from './containers/Profile';
import SessionExists from './containers/SessionExists';
import NotFound from './containers/NotFound';

import FriendRequest from './components/FriendRequest';
import TalkRequest  from './components/TalkRequest';
import './assets/preload';

import { socket } from "./actions/asyncActions";

function App():JSX.Element {
  
  useEffect(() => {
    document.body.onbeforeunload = () => {
      if(socket === null) return;
      socket.disconnect();
    }
  }, [])

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/friends' element={<Friends />}></Route>
        <Route path='/talk' element={<Talk />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/exists' element={<SessionExists />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <FriendRequest />
      <TalkRequest />
    </BrowserRouter>
  )
}

export default App;