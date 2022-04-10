import React from 'react';

function CharacterPreview({character, spotlight}):JSX.Element {

  let image = `https://api.genshin.dev/characters/${character}/portrait`

  if(character === 'aether') {
    image = "https://api.genshin.dev/characters/traveler-anemo/portraitm"
  } else if(character === 'lumine') {
    image = "https://api.genshin.dev/characters/traveler-anemo/portraitf"
  }

  return(
    <div className={'character-preview floating' + (character === spotlight ? ' spotlight' : '')}>
      <img src={image}/>
    </div>
  )
}

export default CharacterPreview;