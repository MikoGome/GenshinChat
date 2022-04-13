import React from "react";
import OnlineUser from "./OnlineUser";

import './stylesheets/OnlineBar.scss'

function OnlineBar({users, socket}):JSX.Element {
  
  const onlineUsers = users.map(([id, el],index) => {
    return (
      <OnlineUser 
        key={'onlineUsers_'+el.name+index} 
        socketId={id}
        name={el.name}
        gender={el.gender}
        main={el.main}
        socket={socket}
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