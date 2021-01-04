import React, { useEffect } from 'react';
import './App.css';
import A from './components/A'
import AppService, { Message } from './app-service'
import sendToSubjects from './send-to-subjects'

function App() {  
  const appService = AppService()
  const id: number = 0
  const idB: number = 1
  useEffect( () => {
    appService.addMessageEventListener((message: string) => {
      console.log("msgA", message)
    }, id)
    appService.addMessageEventListener((message: string) => {
      console.log("msgB", message)
    }, idB)
    appService.onSubjectSend((subjects: [], message: Message) => {
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
        {/* {message} */}
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
