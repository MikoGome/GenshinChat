import React, {useEffect, useRef} from 'react';
import InputBox from './InputBox';

import Message from './Message';

import '../stylesheets/Chat.scss';

function Chat({room, account}): JSX.Element {

  const messages:JSX.Element[] = room.chatHistory.map((el, index) => {
    return <Message key={"Message_"+index} account={account} entry={el}/>
  });

  const chatBox:React.MutableRefObject<HTMLUListElement> = useRef();

  useEffect(() => {
    chatBox.current.scrollTo(0, chatBox.current.scrollHeight);
  }, [room.chatHistory.length]);

  return (
    <div className="chat">
      <ul data-testid="chat-display" ref={chatBox}>
        {messages}
      </ul>
      <InputBox 
        socket={account.socket} 
        name={account.name} 
        gender={account.gender} 
        main={account.main}
        roomId = {room.roomId}
      />
    </div>
  )
}

export default Chat;