import React from 'react';
import CharacterPreview from './CharacterPreview';

function CharactersPreview({spotlight, characters_owned}): JSX.Element {

  const characters = characters_owned.map((el, index) => {
    return <CharacterPreview 
      key={el+'_'+index} 
      character={el.name} 
      spotlight={spotlight}
      />
  });

  return characters
}

export default CharactersPreview;