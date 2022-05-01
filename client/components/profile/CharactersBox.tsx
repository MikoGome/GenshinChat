import React from 'react';
import Character from './Character';
import { iconBig } from '../../utils/helperFunctions';

function CharactersBox({account, gender, spotlight}): JSX.Element {
  
  const characters = account.characters_owned.map((el:string, index) => {
    let name = el;
    if(el.startsWith('traveler')) {
      name = gender === 'male' ? 'aether' : 'lumine';
    }
    
    const picture = iconBig(el, gender);

    return <Character 
      key={'el.name_'+index} 
      name={name} 
      index={index}
      el={el}
      picture={picture}
      spotlight={spotlight}
    />
  });

  return (
    <div className="characters-box">
      {characters}
    </div>
  )
}

export default CharactersBox;