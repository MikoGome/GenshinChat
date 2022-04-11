import React from 'react';
import { titleCase } from '../../utils/helperFunctions'
import {connect} from 'react-redux';
import { changeMain } from '../../actions/asyncActions';

import '../stylesheets/CharacterDescription.scss';

const mapStateToProps = state => ({
  currentMain: state.account.main,
  possession: state.account.possession,
  characters: state.characters
});

const mapDispatchToProps = dispatch => ({
  changeMain: (payload) => dispatch(changeMain(payload))
})

function CharacterDescription({name, changeMain, characters, currentMain, possession}):JSX.Element {

  let key:string = name;
  if(name === 'aether' || name === 'lumine') {
    key = 'traveler-anemo';
  }

  const info = characters[key];
  let birthday = info.birthday?.split('-').slice(1).join('/');
  if(key.startsWith('traveler')) {
    info.vision = 'N/A';
    birthday = 'XX/XX';
  }

  function newMain(input:{main:string, possession: string}) {
    if(currentMain === input.main) return;
    changeMain(input);
  }

  return (
    <div className="character-description">
      <h1>{titleCase(name)}</h1>
      <h4>Birthday: {birthday}</h4>
      <h3>Vision: {info.vision} </h3>
      <h3>Nation: {info.nation}</h3>
      <h3>Affiliation: {info.affiliation}</h3> 
      <h3>Description: {info.description}</h3>
      <button id='main-button' onClick={() => newMain({main: key, possession})}>Set as Main</button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDescription);