import React, { useEffect, useRef } from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";
import { talkStateShapeExtension } from "./Participant";

import '../stylesheets/Partner.scss';


const Partner: React.FC<talkStateShape["focus"] & talkStateShapeExtension> = ({name, main, gender, typer, inactive, focus}): JSX.Element => {
  const partnerPortrait = portrait(main, gender);

  const partner:React.MutableRefObject<HTMLDivElement> = useRef();
  const nameTag: React.MutableRefObject<HTMLDivElement> = useRef();
  const you:React.MutableRefObject<HTMLImageElement> = useRef();

  useEffect(() => {
    if(focus.name === name) {
      if(main === 'razor') {
        you.current.style.left='-25%';
      } else {
        you.current.style.left='0%';
      }
      you.current.classList.remove('hide-partner');
      nameTag.current.classList.remove('hide-partner');
    } else {
      you.current.classList.add('hide-partner');
      nameTag.current.classList.add('hide-partner');
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
      <div className="name-tag hide-partner" ref={nameTag}>{name}</div>
    </div>
  )
}

export default Partner;