import React, { useEffect, useRef } from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";

import '../stylesheets/Partner.scss';

const Partner: React.FC<talkStateShape["focus"]> = (participant): JSX.Element => {
  console.log('participant', participant);
  const partnerPortrait = portrait(participant.main, participant.gender);

  const partner = useRef();

  useEffect(() => {
  }, []);

  return (
    <div className="partner" ref={partner}>
      <img
        src={partnerPortrait} 
      />
    </div>
  )
}

export default Partner;