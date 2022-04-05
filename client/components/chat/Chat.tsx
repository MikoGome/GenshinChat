import React, {useState} from 'react';
import InputBox from './InputBox';
import { sendMessage } from '../../actions/actions';
import { connect } from 'react-redux';

import Message from './Message';

const mapStateToProps = state => ({
  account: state.account,
  page: state.page
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (name, textBox) => dispatch(sendMessage({sender: name, message: textBox.value}))
});

function Chat({page, account, sendMessage}) {

  const messages = page.chatHistory.map((el, index) => {
    return <Message key={"Message_"+index} entry={el}/>
  });

  return (
    <div className="Chat">
      <ul data-testid="chat-display">
        {messages}
      </ul>
      <InputBox name={account.name} sendMessage={sendMessage}/>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);