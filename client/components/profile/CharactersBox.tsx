import React from 'react';
import Character from './Character';

function CharactersBox({account, change, gender}): JSX.Element {
  
  const characters = account.characters_owned.map((el:{name: string}, index) => {
    let image = `https://api.genshin.dev/characters/${el.name}/icon-big`;
    let backupImage = `https://api.genshin.dev/characters/${el.name}/icon`
    let name = el.name;
    if(el.name.startsWith('traveler')) {
      name = gender === 'male' ? 'aether' : 'lumine';
      image = 'https://api.genshin.dev/characters/traveler-anemo/icon-big-' + name;
    }
    return <Character 
      key={'el.name_'+index} 
      name={name} 
      picture={image} 
      backupPicture={backupImage} 
      change={change}
    />
  });

  return (
    <div className="characters-box">
      {characters}
    </div>
  )
}

export default CharactersBox;