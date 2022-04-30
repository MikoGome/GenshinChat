import React, { useEffect, useRef } from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";
import { talkStateShapeExtension } from "./Participant";

import '../stylesheets/Partner.scss';


const Partner: React.FC<talkStateShape["focus"] & talkStateShapeExtension> = ({name, main, gender, typer, inactive, focus}): JSX.Element => {
  const partnerPortrait = portrait(main, gender);

  const partner:React.MutableRefObject<HTMLDivElement> = useRef();
  const you:React.MutableRefObject<HTMLImageElement> = useRef();

  useEffect(() => {
    if(focus.name === name) {
      you.current.classList.remove('hide-partner');
    } else {
      you.current.classList.add('hide-partner');
    }
  }, [focus]);


  useEffect(() => {
    if(name in typer) {
      you.current.classList.add('typing');
    } else {
      you.current.classList.remove('typing');
    }
  }, [typer]);

  useEffect(() => {
    if(name in inactive) {
      you.current.classList.add('inactive');
    } else {
      you.current.classList.remove('inactive');
    }
  }, [inactive])

  return (
    <div className="partner" ref={partner}>
      <img
        src={partnerPortrait}
        className="breathing hide-partner"
        ref={you}
      />
      <div className="name-tag">{name}</div>
    </div>
  )
}

export default Partner;