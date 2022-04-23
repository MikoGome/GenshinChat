import React from "react";
import { portrait } from "../../utils/helperFunctions";

import { talkStateShape } from "../../reducers/talkReducer";

import '../stylesheets/MyAvatar.scss';

const MyAvatar:React.FC<talkStateShape["focus"]> = ({name, main, gender}): JSX.Element => {

  const picture = portrait(main, gender);

  return (
    <div className="my-avatar">
      <img 
        src={picture} 
      />
    </div>
  )
}

export default MyAvatar;