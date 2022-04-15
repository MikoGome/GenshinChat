import React, {useEffect, useRef} from 'react';

function CharacterPreview({character, spotlight, gender}):JSX.Element {
  
  let image = `https://api.genshin.dev/characters/${character}/portrait`;
  
  if(character.startsWith('traveler')) {
    const append = gender === 'male' ? 'm' : 'f';
    image = "https://api.genshin.dev/characters/traveler-anemo/portrait" + append;
    character = gender === 'male' ? 'aether' : 'lumine';
  }

  const char:React.MutableRefObject<HTMLDivElement> = useRef();

  useEffect(() => {
    if(character === spotlight) {
      char.current.classList.add('spotlight');
    } else {
      char.current.classList.remove('spotlight');
    }
  }, [spotlight]);

  return(
    <div className="character-preview floating" ref={char}>
      <img src={image} />
    </div>
  )
}

export default CharacterPreview;