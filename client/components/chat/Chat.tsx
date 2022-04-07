import React, {useState} from 'react';
import InputBox from './InputBox';
import { connect } from 'react-redux';

import Message from './Message';

import '../stylesheets/Chat.scss';

const mapStateToProps = state => ({
  account: state.account,
  page: state.page
});

function Chat({page, account}): JSX.Element {

  const messages = page.chatHistory.map((el, index) => {
    return <Message key={"Message_"+index} entry={el}/>
  });

  return (
    <div className="chat">
      <ul data-testid="chat-display">
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