import React, { useEffect, useRef } from "react";
import SendIcon from '@mui/icons-material/Send';

function InputBox({name, gender, main, socket, roomId}): JSX.Element {
  const message:React.MutableRefObject<HTMLInputElement> = useRef();

  function send(name, main, gender, messageElement) {
    const message = messageElement.value.trim();
    if(message.length === 0) return;

    if(roomId) {
      socket.emit('talk', {name, main, gender, message, roomId});
    } else {
      socket.emit('sendMessage', {name, main, gender, message});
    }

    messageElement.value = '';
  }

  useEffect(() => {
    message.current.focus();
  }, []);

  const doneTyping:React.MutableRefObject<undefined | NodeJS.Timeout> = useRef();

  function typing(e:React.KeyboardEvent<HTMLInputElement>):void {
    if(e.key === 'Enter') {
      send(name, main, gender, message.current);
    } else if(roomId && e.key !== 'Backspace' && !e.altKey && !e.ctrlKey){

      if(doneTyping.current) {
        clearInterval(doneTyping.current);
      }

      socket.emit('typing', roomId);

      doneTyping.current = setTimeout(() => {
        socket.emit('doneTyping', roomId);
      }, 3000);
    }
  }

  return (
    <div className='input-box'>
      <input 
        type='text' 
        ref={message} 
        onKeyDown={typing}
      />
      <button onClick={() => send(name, main, gender, message.current)}>
        <SendIcon />
      </button>
    </div>
  )
}

export default InputBox;