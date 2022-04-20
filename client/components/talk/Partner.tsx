import React from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";

const Partner: React.FC<talkStateShape["focus"]> = (participant): JSX.Element => {
  console.log('participant', participant);
  const partnerPortrait = portrait(participant.main, participant.gender);
  return (
    <div className="avatar partner">
      <img
         src={partnerPortrait} 
         onLoad={(e:any) => e.target.classList.add('avatar-appear')}
      />
    </div>
  )
}

export default Partner;