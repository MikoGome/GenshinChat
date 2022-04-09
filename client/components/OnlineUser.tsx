import React from "react";
import { useRef } from "react";

function OnlineUser({name, gender, main}): JSX.Element {
  const li:React.MutableRefObject<HTMLLIElement> = useRef();
  const append = gender === 'male' ? '-aether' : '-lumine';
  const picture = `https://api.genshin.dev/characters/${main}/icon-big${main.startsWith('traveler') ? append : ''}`
  return (
    <li ref={li}>
      <img src={picture} onLoad={() => li.current.classList.add('appearBottom')} />
      <h4>{name}</h4>
    </li>
  )
}

export default OnlineUser;