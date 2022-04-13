import React, { useEffect } from 'react';
import CharacterPreview from './CharacterPreview';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  spotlight: state.characters.spotlight
})

function CharactersPreview({spotlight, characters_owned, gender}): JSX.Element {

  if(spotlight.startsWith('traveler')) {
    if(gender === 'male') {
      spotlight = 'aether';
    } else if(gender === 'female') {
      spotlight = 'lumine';
    }
  }

  const characters = characters_owned.map((el, index) => {
    return <CharacterPreview 
      key={el+'_'+index} 
      character={el} 
      spotlight={spotlight}
      gender = {gender}
      />
  });

  return characters
}

export default connect(mapStateToProps, null)(CharactersPreview);