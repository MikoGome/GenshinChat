import React, {useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import InputBox from './InputBox';
import Message from './Message';

import { wishing } from '../../actions/asyncActions';

import '../stylesheets/Chat.scss';

function Chat({room, account}): JSX.Element {

  const messages:JSX.Element[] = room.chatHistory.map((el, index) => {
    return <Message key={"Message_"+index} account={account} entry={el}/>
  });

  const chatBox:React.MutableRefObject<HTMLUListElement> = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    chatBox.current.scrollTo(0, chatBox.current.scrollHeight);
  }, [room.chatHistory.length]);

  function incrementWish() {
    console.log(room.messageProg)
    if(room.messageProg % 20 === 0) {
      dispatch(wishing({possession: account.possession}))
    }
  }

  return (
    <div className="chat">
      <ul data-testid="chat-display" ref={chatBox}>
        {messages}
      </ul>
      <InputBox 
        account={account}
        roomId={room.roomId}
        incrementWish={incrementWish}
      />
    </div>
  )
}

export default Chat;