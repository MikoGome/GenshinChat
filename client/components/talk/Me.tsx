import React from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";

import '../stylesheets/Me.scss';

const Me:React.FC<talkStateShape["focus"]> = ({name, main, gender}): JSX.Element => {

  const picture = portrait(main, gender);

  return (
    <div className="me">
      <img 
        src={picture} 
        onLoad={(e:any) => e.target.classList.add('floating')}
      />
    </div>
  )
}

export default Me;