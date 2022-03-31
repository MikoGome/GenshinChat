import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './containers/Home.tsx';
import Login from './containers/Login.tsx';
import NotFound from './containers/NotFound.tsx';

function App():JSX.Element {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;