import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './containers/Home';
import Login from './containers/Login';
import Shop from './containers/Shop';
import Friends from './containers/Friends';
import Talks from './containers/Talks';
import Profile from './containers/Profile';
import NotFound from './containers/NotFound';
import './assets/preload';

function App():JSX.Element {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/friends' element={<Friends />}></Route>
        <Route path='/talks' element={<Talks />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;