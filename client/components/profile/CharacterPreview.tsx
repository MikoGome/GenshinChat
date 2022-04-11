import React from 'react';

function CharacterPreview({character, spotlight, gender}):JSX.Element {
  
  let image = `https://api.genshin.dev/characters/${character}/portrait`;
  
  if(character.startsWith('traveler')) {
    const append = gender === 'male' ? 'm' : 'f';
    image = "https://api.genshin.dev/characters/traveler-anemo/portrait" + append;
    character = gender === 'male' ? 'aether' : 'lumine';
  }

  return(
    <div className={'character-preview floating' + (character === spotlight ? ' spotlight' : '')}>
      <img src={image} />
    </div>
  )
}

export default CharacterPreview;