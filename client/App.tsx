import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './containers/Home';
import Login from './containers/Login';
import Shop from './containers/Shop';
import Friends from './containers/Friends';
import Talk from './containers/Talk';
import Profile from './containers/Profile';
import NotFound from './containers/NotFound';

import FriendRequest from './components/FriendRequest';
import TalkRequest  from './components/TalkRequest';
import './assets/preload';

function App():JSX.Element {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/friends' element={<Friends />}></Route>
        <Route path='/talk' element={<Talk />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <FriendRequest />
      <TalkRequest />
    </BrowserRouter>
  )
}

export default App;