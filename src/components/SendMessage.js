import React, { useState } from 'react';

const SendMessage = ({ sendMessage }) => {
    const [ message, setMessage ] = useState('')
    return (
      <article>
        Message
        <input 
            value={message}
            onChange={({ target: {value: message} }) => 
                setMessage(message)
            }
        />
        <button onClick={() => sendMessage(message)}>
            Send Message
        </button>
      </article>)
  }

  export default SendMessage
