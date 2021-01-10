import { BehaviorSubject, timer, asyncScheduler, from, NEVER, zip } from 'rxjs'
import { observeOn, switchMap, map, takeWhile, } from "rxjs/operators";
const K = 1000;
const INTERVAL = K;
const MINUTES = 25;
const TIME = MINUTES * K * 60;
// let current: number;
let time = TIME;
const currentInterval = () => time / INTERVAL;
const toRemainingSeconds = (t: number) => currentInterval() - t;

const toggle$ = new BehaviorSubject(true);
const remainingSeconds$ = toggle$.pipe(
  switchMap((running: boolean) => {
    return running ? timer(0, INTERVAL) : NEVER;
  }),
  // map(toRemainingSeconds),
  takeWhile((t: any) => t >= 0)
)
// remainingSeconds$.subscribe(e => console.log('xxx', e))

const a$ = new BehaviorSubject('a')
zip(remainingSeconds$, a$)
  // .pipe(takeWhile((t: any) => t < 3))
  .subscribe(e => console.log('--', e),
    err => console.log(err),
    () => console.log('complete')
  )
a$.next('b')
a$.next('c')
a$.next('d')
// zip(d, to
setTimeout(() => {
  console.log('aaa')
  a$.next('b')
  a$.next('c')
  a$.next('d')
  a$.next('b')
  a$.next('c')
  a$.next('d')
  a$.next('b')
  a$.next('c')
  a$.next('d')
  a$.next('b')
  a$.next('c')
  a$.next('d')
      //  toggle$.next(false)
}, 10000)

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
