import React from 'react';
import Character from './Character';

function CharactersBox({account, gender}): JSX.Element {
  
  const characters = account.characters_owned.map((el:string, index) => {
    let image = `https://api.genshin.dev/characters/${el}/icon-big`;
    let backupImage = `https://api.genshin.dev/characters/${el}/icon`
    let name = el;
    if(el.startsWith('traveler')) {
      name = gender === 'male' ? 'aether' : 'lumine';
      image = 'https://api.genshin.dev/characters/traveler-anemo/icon-big-' + name;
    }
    return <Character 
      key={'el.name_'+index} 
      name={name} 
      el={el}
      picture={image} 
      backupPicture={backupImage} 
    />
  });

  return (
    <div className="characters-box">
      {characters}
    </div>
  )
}

export default CharactersBox;