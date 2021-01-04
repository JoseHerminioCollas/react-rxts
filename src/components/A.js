import React, { useEffect, useState } from 'react';
import SendMessage from './SendMessage'

const A = ({ appService, id }) => {
    const [ message, setMessage ] = useState('')
    useEffect( () => {
        appService.addMessageEventListener((message) => {
            setMessage(message)
        }, id)
    })

    return (
      <section>
        <SendMessage
          sendMessage={m => appService.addMessage(m, id)}
        />
        <article data-id="message">{message}</article>
      </section>)
  }
export default A
