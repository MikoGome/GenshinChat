import React from "react";
import { Link } from "react-router-dom";

function Home():JSX.Element {
  return (
    <>
      <h1>Home</h1>
      <Link to='/login'>Login</Link>
    </>
  );
}

export default Home;