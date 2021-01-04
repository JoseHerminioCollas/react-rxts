import { Subject, timer, zip } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Message {
    message: string;
    id: number | null;
}
interface AddMessageEventListener {
    (listener: (message: string) => void, id: number): void;
}
interface AddMessage {
    (message: string, id: number | null): void;
}
interface AppServiceI {
    (): {
        addMessageEventListener: AddMessageEventListener;
        addMessage: AddMessage;
    }
}
export interface MessageEventListener {
    listener: any;
    id: number;
}

const AppService: AppServiceI = () => {
    const messages$: Subject<Message> = new Subject()
    const timer$ = timer(0, 3000)
    const messageEventListeners: MessageEventListener[] = []
    const sendToSubjects = (message: Message) => {
        messageEventListeners
            .filter((e: any) => e.id !== message.id)
            .forEach((element: any) => {
                element.listener.next(message.message)
            });
    }
    zip(messages$, timer$).pipe(
        map(([message]) => message))
        .subscribe((message: Message) => {
            sendToSubjects(message)
        })
    const addMessage: AddMessage = (message, id) => {
        messages$.next({ message, id })
    }
    const addMessageEventListener: AddMessageEventListener = (listener, id) => {
        const mEL: MessageEventListener = {
            listener: new Subject()
                .asObservable()
                .subscribe((e: any) => {
                    listener(e)
                }),
            id
        }
        messageEventListeners.push(mEL)
    }
    return {
        addMessageEventListener,
        addMessage,
    }
}

export default AppService
