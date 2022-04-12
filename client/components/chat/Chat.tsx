import React, {useEffect, useState, useRef} from 'react';
import InputBox from './InputBox';
import { connect } from 'react-redux';

import Message from './Message';

import '../stylesheets/Chat.scss';

const mapStateToProps = state => ({
  account: state.account,
  page: state.page
});

function Chat({page, account}): JSX.Element {
  const messages:JSX.Element[] = page.chatHistory.map((el, index) => {
    return <Message key={"Message_"+index} account={account} entry={el}/>
  });

  const chatBox:React.MutableRefObject<HTMLUListElement> = useRef();

  useEffect(() => {
    // const latest = page.chatHistory[page.chatHistory.length - 1];
    // if (latest?.name !== account.name) return;
    chatBox.current.scrollTo(0, chatBox.current.scrollHeight);
  }, [page.chatHistory.length]);

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
      />
    </div>
  )
}

export default connect(mapStateToProps, null)(Chat);