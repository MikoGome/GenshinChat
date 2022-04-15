import React from "react";
import OnlineUser from "./OnlineUser";

import './stylesheets/OnlineBar.scss'

function OnlineBar({friends, users, socket}):JSX.Element {
  
  const onlineUsers = users.map(([id, el],index) => {
    let bond = false;
    if(el.name in friends) bond = true;
    return (
      <OnlineUser 
        key={'onlineUsers_'+el.name+index} 
        socketId={id}
        name={el.name}
        gender={el.gender}
        main={el.main}
        socket={socket}
        bond={bond}
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