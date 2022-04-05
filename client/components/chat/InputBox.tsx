import React, { useRef } from "react";

function InputBox({sendMessage, name}) {
  const message:React.MutableRefObject<HTMLInputElement> = useRef();
  
  async function send() {
    sendMessage(name, message.current);
    message.current.value = '';
    const test = await 'hello';
    console.log(test);
  }

  return (
    <div className='InputBox'>
      <input type='text' ref={message} />
      <button onClick={send}>Send</button>
    </div>
  )
}

export default InputBox;