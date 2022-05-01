import React, { useEffect, useRef } from "react";
import SendIcon from '@mui/icons-material/Send';

function InputBox({account, roomId, incrementWish}): JSX.Element {
  const message:React.MutableRefObject<HTMLInputElement> = useRef();

  function send(name, main, gender, messageElement) {
    const message = messageElement.value.trim();
    if(message.length === 0) return;

    if(roomId) {
      account.socket.emit('talk', {name, main, gender, message, roomId, possession: account.possession});
      incrementWish();
    } else {
      account.socket.emit('sendMessage', {name, main, gender, message});
    }
    messageElement.value = '';
  }

  useEffect(() => {
    message.current.focus();
  }, []);

  const doneTyping:React.MutableRefObject<undefined | NodeJS.Timeout> = useRef();

  function typing(e:React.KeyboardEvent<HTMLInputElement>):void {
    if(e.key === 'Enter') {
      send(account.name, account.main, account.gender, message.current);
    } else if(roomId && e.key !== 'Backspace' && !e.altKey && !e.ctrlKey){

      if(doneTyping.current) {
        clearInterval(doneTyping.current);
      }

      account.socket.emit('typing', roomId);

      doneTyping.current = setTimeout(() => {
        account.socket.emit('doneTyping', roomId);
      }, 1500);
    }
  }

  return (
    <div className='input-box'>
      <input 
        type='text' 
        ref={message} 
        onKeyDown={typing}
      />
      <button onClick={() => send(account.name, account.main, account.gender, message.current)}>
        <SendIcon />
      </button>
    </div>
  )
}

export default InputBox;