import { Subject, Subscriber, timer, zip } from 'rxjs'
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
export interface MessageEventListener {
    listener: any;
    id: number;
}
const AppService: AppServiceI = () => {
    let messageListener: any
    const messages$: Subject<Message> = new Subject()
    const timer$ = timer(0, 3000)
    const messageEventListeners: MessageEventListener[] = []
    zip(messages$, timer$).pipe(
        map(([message]) => message))
        .subscribe((message: Message) => {
            messageListener(messageEventListeners, message)
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
    const onSubjectSend: OnSubjectSend = (listener) => {
        messageListener = listener
    }
    return {
        addMessageEventListener,
        addMessage,
        onSubjectSend,
    }
}

export default AppService
