import React, { useEffect, useState } from "react";

function LoginCharacter():JSX.Element {
  const [characterUrl, setCharacterUrl] = useState<string>('');

  useEffect(() => {
    const characterEndpoint:string = '/api/character';

    fetch(characterEndpoint)
      .then(res => res.json())
      .then(data => {
        const url:string = `https://api.genshin.dev/characters/${data}/portrait`;
        setCharacterUrl(url);
      });
  }, []);

  function animate(e):void {
    e.target.classList.add('appearRight');
  }

  return <img className="character-image" onLoad={(e):void => animate(e)} src={characterUrl} alt='random genshin character'/>
}

export default LoginCharacter;