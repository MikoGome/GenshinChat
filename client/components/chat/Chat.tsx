import React, {useEffect, useRef, memo} from 'react';
import { useDispatch } from 'react-redux';
import InputBox from './InputBox';
import Message from './Message';

import { wishing } from '../../actions/asyncActions';
import { incrementMsgProg } from '../../actions/actions';

import '../stylesheets/Chat.scss';
import {sfx} from '../../assets/preload';

const Chat:React.FC<{room: any, account: any, friend?: boolean, others?: number}> = ({room, account, friend, others}): JSX.Element => {
  
  const messages:JSX.Element[] = room.chatHistory.map((el, index) => {
      return <Message key={"Message_"+index} myName={account.name} entry={el}/>
    });

  const chatBox:React.MutableRefObject<HTMLUListElement> = useRef();

  const dispatch = useDispatch();

  const chatLength = useRef<number>(room.chatHistory.length);

  useEffect(() => {
    if(room.chatHistory.length !== chatLength.current) sfx(7);
    chatBox.current.scrollTo(0, chatBox.current.scrollHeight);
  }, [room.chatHistory.length]);

  function incrementWish() {
    if(!others) return;
    dispatch(incrementMsgProg());
    const goal = friend ? 10 : 20;
    if(room.messageProg % goal === 0) {
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

export default memo(Chat, (prevProps, nextProps) => {
  if(prevProps.account.socket !== nextProps.account.socket) return false; 
  return prevProps.room.chatHistory.length === nextProps.room.chatHistory.length;
});