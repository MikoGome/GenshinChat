import React from 'react';
import NavBar from '../components/NavBar';

function Profile(): JSX.Element {
  return (
    <div className="profile">
      <NavBar current="profile"/>
    </div>
  )
}

export default Profile;