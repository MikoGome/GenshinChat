import React from 'react';
import NavBar from '../components/NavBar';

function Friends(): JSX.Element {
  return (
    <div className="friends">
      <NavBar current="friends"/>
    </div>
  )
}

export default Friends;