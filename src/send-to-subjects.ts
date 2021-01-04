import { send } from "process";

const sendToSubjects = (subjects: [], message: any) => {
    subjects
        .filter((e: any, i: number) => i !== message.id)
        .forEach((element: any) => {
            element.next(message.message)
        });
  }

  export default sendToSubjects