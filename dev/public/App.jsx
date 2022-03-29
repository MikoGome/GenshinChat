import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
function App() {
    return (<BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>);
}
export default App;
