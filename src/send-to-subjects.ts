import { Message } from './app-service'

const sendToSubjects = (subjects: [], message: Message) => {
    subjects
        .filter((e: any) => e.id !== message.id)
        .forEach((element: any) => {
            element.listener.next(message.message)
        });
  }

  export default sendToSubjects