import React from 'react';

function Message({account, entry}): JSX.Element {
  const {name, main, gender, message} = entry
  
  const append:string = gender === 'male' ? '-aether' : '-lumine';
  const picture = `https://api.genshin.dev/characters/${main}/icon-big${main.startsWith('traveler') ? append : ''}`
  // let picture = `https://api.genshin.dev/characters/${main}/icon`;
  // if(main.startsWith('traveler')) {
  //   if(gender === 'male') picture = 'https://api.genshin.dev/characters/${main}/icon-big-aether';
  //   else if(gender === 'female') picture = 'https://api.genshin.dev/characters/${main}/icon-big-lumine';
  // }
  
  return(
    <li className={account.name === name ? 'me': ''}>
      <div className="icon">
        <img src={picture} alt={main} />
      </div>
      <div className={"message"}>
        <div className="bubble">
          {message}
        </div>
        <aside>
          {name}
        </aside>
      </div>
    </li>
  )
}

export default Message;