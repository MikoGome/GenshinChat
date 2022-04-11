import React, {useState} from 'react';
import { updateMain } from '../../actions/actions';
import {titleCase} from '../../utils/helperFunctions';

function Character({name, picture, backupPicture, change}):JSX.Element {
  const [image, setImage] = useState<string>(picture);
  return(
    <div className="character" onClick={() => {
        change(name);
      }}>
      <figure>
        <img src={image} onError={e => setImage(backupPicture)}/>
        <figcaption>{titleCase(name)}</figcaption>
      </figure>
    </div>
  )
}

export default Character;