import React, {useEffect, useRef} from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";

import '../stylesheets/MyAvatar.scss';

const MyAvatar:React.FC<talkStateShape["focus"] & ({typer: ({[name:string]: boolean}|{})}) > = ({name, main, gender, typer}): JSX.Element => {

  const picture = portrait(main, gender);

  const me: React.MutableRefObject<HTMLImageElement> = useRef();


  useEffect(() => {
    if(main === 'razor') {
      me.current.style.left = '-50%';
    }
    me.current.classList.remove('hide-me');
  }, [])

  useEffect(() => {
    if(name in typer) {
      me.current.classList.add('typing');
    } else {
      me.current.classList.remove('typing');
    }
  }, [typer]);

  return (
    <div className="my-avatar">
      <img 
        src={picture} 
        className="breathing hide-me"
        ref={me}
      />
    </div>
  )
}

export default MyAvatar;