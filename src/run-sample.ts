import { BehaviorSubject, timer, asyncScheduler, from, NEVER, zip } from 'rxjs'
import { switchMap, takeWhile, timestamp } from "rxjs/operators";

let timeStamp: number = Date.now()
const K = 1000;
const INTERVAL = K;
const a$ = new BehaviorSubject('a')
const toggle$ = new BehaviorSubject(true);
const remainingSeconds$ = toggle$.pipe(
  switchMap((running: boolean) => {
    return running ? timer(0, INTERVAL) : NEVER;
  }),
  takeWhile((t: any) => {
    // console.log('t', Date.now())
    // console.log('t', timeStamp)
    // console.log('t')
    if (Date.now() > timeStamp + 2000) {
      console.log('quit')
      toggle$.next(false)
    }
    return t >= 0
  }
  ))
  remainingSeconds$.subscribe(e => console.log('e', e))
zip(remainingSeconds$, a$)
  .subscribe(e => {
  // toggle$.next(true)
  console.log('--', e, timeStamp)
    timeStamp = Date.now()
  },
    err => console.log(err),
    () => console.log('complete')
  )

a$.next('bbbbbb')
a$.next('c')
a$.next('z')
a$.next('b')
const arr = ['a', 'b', 'c', 'z']
setTimeout(() => {
  console.log('aaa')
  toggle$.next(true)
  // arr.forEach( (e: any) => a$.next(e))
  a$.next('aaaa')
  a$.next('b')
  a$.next('c')
  // toggle$.next(false)
}, 10000)

setTimeout(() => {
  console.log('vvv')
  toggle$.next(true)
  arr.forEach((e: any) => a$.next(e))
  a$.next('vvv')
  a$.next('b')
  a$.next('c')
  // toggle$.next(false)
}, 20000)

// const observable$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9]).pipe(
//   observeOn(asyncScheduler, 1000)
// );
// console.log("Just before the asyncScheduler");
// observable$.subscribe(val => {
//   console.log("Received: " + val);
// });
// console.log("Just after the asyncScheduler");

// const timer$ = timer(3000, 6000)
// timer$.subscribe(console.log)
