import React from 'react';
import Character from './Character';

function CharactersBox({account}): JSX.Element {
  console.log('account', account);

  const characters = account.characters_owned.map((el:{name: string}, index) => {
    let image = `https://api.genshin.dev/characters/${el.name}/icon-big`;
    if(el.name === 'aether' || el.name ==='lumine') {
      image = 'https://api.genshin.dev/characters/traveler-anemo/icon-big-' + el.name;
    }
    return <Character key={'el.name_'+index} name={el.name} picture={image}/>
  });

  return (
    <div className="characters-box">
      {characters}
    </div>
  )
}

export default CharactersBox;