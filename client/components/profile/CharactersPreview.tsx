import React from 'react';
import CharacterPreview from './CharacterPreview';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  spotlight: state.characters.spotlight
})

function CharactersPreview({spotlight, characters_owned, gender}): JSX.Element {

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