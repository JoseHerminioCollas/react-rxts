import { Subject, timer, zip } from 'rxjs'
import { map } from 'rxjs/operators'

interface Message {
    message: string;
    id: number | null;
}
interface AddMessageEventListener {
    (listener: any, id: number) : void;
}
interface AppService {
    (): {
        addMessageEventListener: AddMessageEventListener;
        addMessage: (Message: string, id: number | null) => void;
        onSubjectSend: (listener: any) => void;
    }
}
const AppService: AppService = () => {
    let messageListener: any
    const messages$: Subject<Message> = new Subject()
    const timer$ = timer(0, 3000)
    const messageSubjects: any = []
    zip(messages$, timer$).pipe(
        map(([value]) => value))
        .subscribe((value: any) => {
            messageListener(messageSubjects, value)
        })
    const addMessage = (message = "", id: (number | null)) => {
        messages$.next({message, id})
    }
    const addMessageEventListener: AddMessageEventListener = (listener, id) => {
        messageSubjects[id] = new Subject()
        messageSubjects[id]
            .asObservable()
            .subscribe(listener)
    }
    const onSubjectSend = (listener: any) => {
        messageListener = listener
    } 
    return {
        addMessageEventListener,
        addMessage,
        onSubjectSend,
    }
}

export default AppService
