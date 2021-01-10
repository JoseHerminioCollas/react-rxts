import { BehaviorSubject, timer, NEVER, zip } from 'rxjs'
import { switchMap, takeWhile } from "rxjs/operators";

const a$ = new BehaviorSubject('a')
const toggle$ = new BehaviorSubject(true);
const timerEngine: any = () => {
    let timeStamp: number = Date.now()
    const K = 1000;
    const INTERVAL = K;
    const timerEngine$ = toggle$.pipe(
        switchMap((running: boolean) => running ? timer(0, INTERVAL) : NEVER),
        takeWhile((t: any) => {
            if (Date.now() > timeStamp + 2000) {
                console.log('quit')
                toggle$.next(false)
            }
            return t >= 0
        }))
    // timerEngine$.subscribe(e => console.log('e', e))
    const z = zip(timerEngine$, a$)
    z.subscribe((eA: any) => {
        // toggle$.next(true)
        console.log('eA', eA)
    })
    return z
    // .subscribe(e => {
    //     // toggle$.next(true)
    //     console.log('--', e, timeStamp)
    //     timeStamp = Date.now()
    // },
    //     err => console.log(err),
    //     () => console.log('complete')
    // )
}
//////////
timerEngine().subscribe((e: any) => console.log('x', e))
//////
a$.next('bbbbbb')
a$.next('c')
a$.next('z')
a$.next('b')
const arr = ['a', 'b', 'c', 'z']
setTimeout(() => {
    console.log('aaa')
    toggle$.next(true)
    a$.next('aaaa')
    a$.next('b')
    a$.next('c')
}, 10000)
setTimeout(() => {
    console.log('vvv')
    toggle$.next(true)
    // arr.forEach((e: any) => a$.next(e))
    a$.next('vvv')
    a$.next('b')
    a$.next('c')
}, 20000)

