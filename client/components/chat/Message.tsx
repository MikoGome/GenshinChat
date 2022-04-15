import React from 'react';
import { iconBig } from '../../utils/helperFunctions';

function Message({account, entry}): JSX.Element {
  const {name, main, gender, message} = entry
  const {picture, backupPicture} = iconBig(main, gender);
  
  return(
    <li className={account.name === name ? 'me': ''}>
      <div className="icon">
        <img src={picture} alt={main} onError={(e) => e.target.src=backupPicture}/>
      </div>
      <div className={"message"}>
        <div className="bubble bubbling">
          {message}
        </div>
        <aside>
          {name}
        </aside>
      </div>
    </li>
  )
}

export default Message;