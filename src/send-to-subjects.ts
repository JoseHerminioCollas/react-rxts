import { Message, MessageEventListener } from './app-service'

const sendToSubjects = (subjects: MessageEventListener[], message: Message) => {
    subjects
        .filter((e: any) => e.id !== message.id)
        .forEach((element: any) => {
            element.listener.next(message.message)
        });
  }

  export default sendToSubjects