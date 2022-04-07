import React from "react";

function OnlineUser({name, gender, main}): JSX.Element {

  const append = gender === 'male' ? '-aether' : '-lumine';
  const picture = `https://api.genshin.dev/characters/${main}/icon-big${main.startsWith('traveler') ? append : ''}`
  return (
    <li>
      <img src={picture} />
      <h4>{name}</h4>
    </li>
  )
}

export default OnlineUser;