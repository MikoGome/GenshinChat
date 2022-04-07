import React from "react";
import OnlineUser from "./OnlineUser";

import './stylesheets/OnlineBar.scss'

function OnlineBar({users}):JSX.Element {

  const onlineUsers = users.map((el,index) => {
    return (
      <OnlineUser 
        key={'onlineUsers_'+el.name+index} 
        name={el.name}
        gender={el.gender}
        main={el.main}
      />
    )
  });

  return (
    <ul className='online-bar'>
      <h1>Online: {onlineUsers.length}</h1>
      {onlineUsers}
    </ul>
  )
}

export default OnlineBar;