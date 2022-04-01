import React, { useEffect, useState, useRef, useContext } from "react";
import Aether from '../assets/aether.png';
import Lumine from '../assets/lumine.png';

import {GenderContext} from '../containers/Login.tsx';

function LoginCharacter({login}):JSX.Element {
  const [characterUrl, setCharacterUrl] = useState<string>('');

  const image = useRef(null);
  
  const {gender} = useContext(GenderContext);
  
  useEffect(() => {
    if(!login && gender === 'male') {
      setCharacterUrl(Aether);
    } else if(!login && gender === 'female') {
      setCharacterUrl(Lumine);
    } else {
      const characterEndpoint:string = '/api/character/' + (login ? 'login' : 'signup');

      fetch(characterEndpoint)
        .then(res => res.json())
        .then(data => {
          const url:string = `https://api.genshin.dev/characters/${data}/portrait`;
          setCharacterUrl(url);
        });
    }
  }, [login, gender]);

  useEffect(() => {
    image.current.classList.remove('appearRight');
  }, [login, gender]);

  function animate(e):void {
    e.target.classList.add('appearRight');
  }

  return <img className="character-image" ref={image} onLoad={(e):void => animate(e)} src={characterUrl} alt='random genshin character'/>
}

export default LoginCharacter;