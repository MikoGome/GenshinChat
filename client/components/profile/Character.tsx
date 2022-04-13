import React from 'react';
import {titleCase} from '../../utils/helperFunctions';
import {useDispatch} from 'react-redux';
import {updateSpotlight} from '../../actions/actions';

function Character({name, el, picture, backupPicture}):JSX.Element {
  const dispatch = useDispatch();
  return(
    <div className="character" onClick={() => {
        dispatch(updateSpotlight(el));
      }}>
      <figure>
        <img src={picture} onError={e => e.target.src=backupPicture}/>
        <figcaption>{titleCase(name)}</figcaption>
      </figure>
    </div>
  )
}

export default Character;