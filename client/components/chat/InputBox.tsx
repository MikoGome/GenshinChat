import React, { useRef } from "react";

function InputBox({name, gender, main, socket}) {
  const message:React.MutableRefObject<HTMLInputElement> = useRef();

  function send(name, main, gender, message) {
    socket.emit('sendMessage', {name, main, gender, message: message.value});
    message.value = '';
  }

  return (
    <div className='input-box'>
      <input type='text' ref={message} />
      <button onClick={() => send(name, main, gender, message.current)}>Send</button>
    </div>
  )
}

export default InputBox;