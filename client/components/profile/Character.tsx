import React from 'react';
import {titleCase} from '../../utils/helperFunctions';

function Character({name, picture, backupPicture, change}):JSX.Element {

  return(
    <div className="character" onClick={() => {
        change(name);
      }}>
      <figure>
        <img src={picture} onError={e => e.target.src=backupPicture}/>
        <figcaption>{titleCase(name)}</figcaption>
      </figure>
    </div>
  )
}

export default Character;