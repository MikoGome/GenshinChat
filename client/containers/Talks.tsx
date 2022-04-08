import React from 'react';
import NavBar from '../components/NavBar';

function Talks(): JSX.Element {
  return(
    <div className="talks">
      <NavBar current="talks"/>
    </div>
  )
}

export default Talks;