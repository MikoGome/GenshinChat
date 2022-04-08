import React, { useEffect, useRef } from "react";

function InputBox({name, gender, main, socket}) {
  const message:React.MutableRefObject<HTMLInputElement> = useRef();

  function send(name, main, gender, messageElement) {
    const message = messageElement.value.trim();
    if(message.length === 0) return;
    socket.emit('sendMessage', {name, main, gender, message});
    messageElement.value = '';
  }

  useEffect(() => {
    message.current.focus();
  });

  return (
    <div className='input-box'>
      <input 
        type='text' 
        ref={message} 
        onKeyDown={(e) => {if(e.key === 'Enter') send(name, main, gender, message.current)}}
      />
      <button onClick={() => send(name, main, gender, message.current)}>
        Send
      </button>
    </div>
  )
}

export default InputBox;