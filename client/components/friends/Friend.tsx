import React, { useEffect, useRef } from "react";
import '../stylesheets/Friend.scss';
import ForumIcon from '@mui/icons-material/Forum';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function Friend({name, gender, main, index}): JSX.Element {

  const friend:React.MutableRefObject<HTMLDivElement> = useRef();

  let picture = `https://api.genshin.dev/characters/${main}/icon-big`;
  let backupPicture = `https://api.genshin.dev/characters/${main}/icon`
  if(main.startsWith('traveler')) {
    const main = gender === 'male' ? 'aether' : 'lumine';
    picture = 'https://api.genshin.dev/characters/traveler-anemo/icon-big-' + main;
  }

  setTimeout(() => {
    friend.current.classList.add('slow-bubbling');
    friend.current.classList.remove('hide');
  }, 50 * index)

  return(
    <div className="friend hide" ref={friend}>
      <div className="left">
        <img 
          src={picture} 
          onError={e => e.target.src=backupPicture}
        />
        <h1>{name}</h1>
      </div>
      <div className="right">
        <button>
          <PersonRemoveIcon className="chat-icon" />
        </button>
        <button>
          <ForumIcon className="chat-icon"/>
        </button>
      </div>
    </div>
  )
}

export default Friend;