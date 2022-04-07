import React from 'react';

function Message({entry}): JSX.Element {
  const {name, main, gender, message} = entry
  
  const append:string = gender === 'male' ? '-aether' : '-lumine';
  const picture = `https://api.genshin.dev/characters/${main}/icon-big${main.startsWith('traveler') ? append : ''}`

  return(
    <li className="message">
      <div>
        <img src={picture} alt={main}/>
        {message}
      </div>
      <aside>
        {name}
      </aside>
    </li>
  )
}

export default Message;