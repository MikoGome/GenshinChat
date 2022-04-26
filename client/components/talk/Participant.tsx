import React, { useEffect, useRef } from 'react';

import { talkStateShape } from "../../reducers/talkReducer";

import {iconSide} from '../../utils/helperFunctions';

export interface talkStateShapeExtension {
  typer: {
    [name:string]: boolean
  },
  inactive: {[name:string]: true}
}

const Participant: React.FC<talkStateShape["focus"] & talkStateShapeExtension> = ({name, main, gender, typer, inactive}): JSX.Element => {

  console.log('inactive', inactive);

  const picture = iconSide(main ,gender);

  const participant:React.MutableRefObject<HTMLImageElement> = useRef();

  useEffect(() => {
    if(name in typer) {
      participant.current.classList.add('bounce');
    } else {
      participant.current.classList.remove('bounce');
    }
  }, [typer]);

  useEffect(() => {
    if(name in inactive) {
      participant.current.classList.add('inactive');
    } else {
      participant.current.classList.remove('inactive');
    }
  }, [inactive])

  return (
    <div className="participant bubbling" title={name}>
      <img 
        src={picture} 
        ref={participant}
      />
    </div>
  )
}

export default Participant;