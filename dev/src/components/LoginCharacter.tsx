import React, { useEffect, useState } from "react";

function LoginCharacter():JSX.Element {
  const [characterUrl, setCharacterUrl] = useState('');

  useEffect(() => {
    const characterEndpoint = '/api/character';
    fetch(characterEndpoint)
      .then(res => res.json())
      .then(data => {
        const url = `https://api.genshin.dev/characters/${data}/portrait`;
        setCharacterUrl(url);
      });
  }, []);

  function animate(e) {
    e.target.classList.add('appearRight');
  }

  return <img className="character-image" onLoad={(e) => animate(e)} src={characterUrl} alt='random genshin character'/>
}

export default LoginCharacter;