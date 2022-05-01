import React from 'react';
import { titleCase } from '../../utils/helperFunctions'
import {connect} from 'react-redux';
import { changeMain } from '../../actions/asyncActions';

import '../stylesheets/CharacterDescription.scss';
import {sfx} from '../../assets/preload';

const mapStateToProps = state => ({
  currentMain: state.account.main,
  possession: state.account.possession,
  info: state.characters.info,
  spotlight: state.characters.spotlight
});

const mapDispatchToProps = dispatch => ({
  changeMain: (payload) => dispatch(changeMain(payload))
})

function CharacterDescription({spotlight, changeMain, currentMain, gender, info, possession}):JSX.Element {

  let name:string = spotlight;
  if(spotlight.startsWith('traveler')) {
    if(gender === 'male') name = 'aether';
    else if(gender === 'female') name = 'lumine'
  }

  const char = info[spotlight] || {};
  let birthday = char.birthday?.split('-').slice(1).join('/');
  if(spotlight.startsWith('traveler')) {
    char.vision = 'N/A';
    birthday = 'XX/XX';
  }

  function newMain(input:{main:string, possession: string}) {
    if(currentMain === input.main) return;
    changeMain(input);
  }

  function handleClick():void {
    if(spotlight === currentMain) return;
    sfx(8);
    newMain({main: spotlight, possession});
  }

  return (
    <div className="character-description">
      {spotlight && (
      <>
        <h1>{titleCase(name)}</h1>
        <h4>Birthday: {birthday}</h4>
        <h3>Vision: {char.vision || 'N/A'} </h3>
        <h3>Nation: {char.nation || 'N/A'}</h3>
        <h3>Affiliation: {char.affiliation || 'N/A'}</h3> 
        <h4><fieldset><legend>Description</legend>{char.description || 'N/A'}</fieldset></h4>
        <button 
          id='main-button' 
          className={spotlight !== currentMain ? 'button-hover': null} 
          onClick={handleClick}>
            {currentMain === spotlight ? 'Current Main' : 'Set as Main'}
        </button>
      </>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDescription);