import React, { useEffect, useRef } from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";

import '../stylesheets/Partner.scss';

const Partner: React.FC<talkStateShape["focus"] & ({typer: ({[name:string]: boolean}|{})})> = ({name, main, gender, typer}): JSX.Element => {
  const partnerPortrait = portrait(main, gender);

  const partner = useRef();
  const you:React.MutableRefObject<HTMLImageElement> = useRef();

  useEffect(() => {
  }, []);


  useEffect(() => {
    if(name in typer) {
      you.current.classList.add('typing');
    } else {
      you.current.classList.remove('typing');
    }
  }, [typer]);

  return (
    <div className="partner" ref={partner}>
      <img
        src={partnerPortrait}
        className="breathing"
        ref={you}
      />
    </div>
  )
}

export default Partner;