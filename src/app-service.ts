import { Subject, timer, zip } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Message {
    message: string;
    id: number | null;
}
interface AddMessageEventListener {
    (listener: (message: string) => void, id: number) : void;
}
interface AddMessage {
    (message: string, id: number | null) : void;
}
interface OnSubjectSend {
    (listener: (subjects: [], message: Message) => void): void;
}
interface AppServiceI {
    (): {
        addMessageEventListener: AddMessageEventListener;
        addMessage: AddMessage;
        onSubjectSend: OnSubjectSend;
    }
}
const AppService: AppServiceI = () => {
    let messageListener: any
    const messages$: Subject<Message> = new Subject()
    const timer$ = timer(0, 3000)
    const messageSubjects: any = []
    zip(messages$, timer$).pipe(
        map(([value]) => value))
        .subscribe((value: any) => {
            messageListener(messageSubjects, value)
        })
    const addMessage: AddMessage = (message = "", id: (number | null)) => {
        messages$.next({message, id})
    }
    const addMessageEventListener: AddMessageEventListener = (listener, id) => {
        messageSubjects[id] = new Subject()
        messageSubjects[id]
            .asObservable()
            .subscribe(listener)
    }
    const onSubjectSend: OnSubjectSend = (listener: any) => {
        messageListener = listener
    } 
    return {
        addMessageEventListener,
        addMessage,
        onSubjectSend,
    }
}

export default AppService
