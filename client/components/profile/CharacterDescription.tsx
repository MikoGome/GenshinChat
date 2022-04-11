import React from 'react';
import { titleCase } from '../../utils/helperFunctions'
import {connect} from 'react-redux';

import '../stylesheets/CharacterDescription.scss';

const mapStateToProps = state => ({
  characters: state.characters
});

function CharacterDescription({name, characters}):JSX.Element {

  let key = name;
  if(name === 'aether' || name === 'lumine') {
    key = 'traveler-anemo';
  }

  const info = characters[key];
  if(key.startsWith('traveler')) info.vision = 'N/A';

  return (
    <div className="character-description">
      <h1>{titleCase(name)}</h1>
      <h3>Vision: {info.vision} </h3>
      <h3>Nation: {info.nation}</h3>
      <h3>Affiliation: {info.affiliation}</h3> 
      <h3>Description: {info.description}</h3>
    </div>
  )
}

export default connect(mapStateToProps, null)(CharacterDescription);