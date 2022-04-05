import React from 'react';

function Message({entry}) {

  return(
    <li>
      <div>
        {entry.message}
      </div>
      <aside>
        {entry.sender}
      </aside>
    </li>
  )
}

export default Message;