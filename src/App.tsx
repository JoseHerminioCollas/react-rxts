import React, { useEffect, useState } from 'react';
import './App.css';
import A from './components/A'
import AppService from './app-service'

const sendToSubjects = (subjects: [], message: any) => {
  subjects
      .filter((e: any, i: number) => i !== message.id)
      .forEach((element: any) => {
          element.next(message.message)
      });
}
const appService = AppService()

function App() {  
  const id: number = 0
  const idB: number = 1
  const [ message, setMessage ] = useState('')
  // console.log(setMessage)
  useEffect( () => {
    appService.addMessageEventListener((message: any) => {
      console.log("msgA", message)
    }, id)
    appService.addMessageEventListener((message: any) => {
      console.log("msgB", message)
    }, idB)
    // on message send
    appService.onSubjectSend((subjects: any, message: any) => {
      sendToSubjects(subjects, message)
      console.log(subjects, message.message)
    })
    appService.addMessage("A", id)
    appService.addMessage("B", idB)
    appService.addMessage("C", idB)
    appService.addMessage("D", idB)
    appService.addMessage("E", idB)
  })

  return (
    <div className="App">
        RXJS Messages :
        {message}
        <A 
          appService={appService}
          id={10}
        />
        <A 
          appService={appService}
          id={100}
        />
        <A 
          appService={appService}
          id={1000}
        />
        <A 
          appService={appService}
          id={10000}
          
        />
    </div>
  );
}

export default App;
