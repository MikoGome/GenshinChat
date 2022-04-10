import React from 'react';
import { updateMain } from '../../actions/actions';
import {titleCase} from '../../utils/helperFunctions';

function character({name, picture, change}):JSX.Element {

  return(
    <div className="character" onClick={() => {
        change(name);
      }}>
      <figure>
        <img src={picture}/>
        <figcaption>{titleCase(name)}</figcaption>
      </figure>
    </div>
  )
}

export default character;