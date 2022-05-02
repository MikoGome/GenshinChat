import React from "react";
import OnlineUser from "./OnlineUser";

import './stylesheets/OnlineBar.scss'

function OnlineBar({friends, users, socket}):JSX.Element {
  
  const onlineUsers = [];
  let index = 0;
  for(const key in users) {
    let bond = false;
    const el = users[key];
    const id = key;
    if(el.name in friends) bond = true;
    onlineUsers.push(
      <OnlineUser 
        key={'onlineUsers_'+el.name+index++} 
        socketId={id}
        name={el.name}
        gender={el.gender}
        main={el.main}
        socket={socket}
        bond={bond}
      />
    )
  }

  return (
    <ul className='online-bar'>
      <h1>Online: {onlineUsers.length}</h1>
      {onlineUsers}
    </ul>
  )
}

export default OnlineBar;