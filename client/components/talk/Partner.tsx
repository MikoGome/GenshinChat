import React, { useEffect, useRef } from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";
import { talkStateShapeExtension } from "./Participant";

import '../stylesheets/Partner.scss';


const Partner: React.FC<talkStateShape["focus"] & talkStateShapeExtension> = ({name, main, gender, typer, inactive}): JSX.Element => {
  const partnerPortrait = portrait(main, gender);

  const partner:React.MutableRefObject<HTMLDivElement> = useRef();
  const you:React.MutableRefObject<HTMLImageElement> = useRef();

  useEffect(() => {
    you.current.classList.remove('hide-partner');
  }, []);


  useEffect(() => {
    if(name in typer) {
      you.current.classList.add('typing');
    } else {
      you.current.classList.remove('typing');
    }
  }, [typer]);

  useEffect(() => {
    if(name in inactive) {
      partner.current.classList.add('inactive');
    } else {
      partner.current.classList.remove('inactive');
    }
  }, [inactive])

  return (
    <div className="partner" ref={partner}>
      <img
        src={partnerPortrait}
        className="breathing hide-partner"
        ref={you}
      />
    </div>
  )
}

export default Partner;