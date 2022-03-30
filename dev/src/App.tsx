import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Home.tsx';
import Login from './Login.tsx';
import NotFound from './NotFound.tsx';

function App(): JSX.Element {
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