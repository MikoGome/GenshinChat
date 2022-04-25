import React from 'react';

import { talkStateShape } from "../../reducers/talkReducer";

import {iconSide} from '../../utils/helperFunctions';

const Participant: React.FC<talkStateShape["focus"]> = ({name, main, gender}): JSX.Element => {

  const picture = iconSide(main ,gender);

  return (
    <div className="participant bubbling" title={name}>
      <img 
        src={picture} 
      />
    </div>
  )
}

export default Participant;