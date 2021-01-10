"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var K = 1000;
var INTERVAL = K;
var MINUTES = 25;
var TIME = MINUTES * K * 60;
// let current: number;
var time = TIME;
var currentInterval = function () { return time / INTERVAL; };
var toRemainingSeconds = function (t) { return currentInterval() - t; };
var toggle$ = new rxjs_1.BehaviorSubject(true);
var remainingSeconds$ = toggle$.pipe(operators_1.switchMap(function (running) {
    return running ? rxjs_1.timer(0, INTERVAL) : rxjs_1.NEVER;
}), 
// map(toRemainingSeconds),
operators_1.takeWhile(function (t) { return t >= 0; }));
// remainingSeconds$.subscribe(e => console.log('xxx', e))
var a$ = new rxjs_1.BehaviorSubject('a');
rxjs_1.zip(remainingSeconds$, a$)
    // .pipe(takeWhile((t: any) => t < 3))
    .subscribe(function (e) { return console.log('--', e); }, function (err) { return console.log(err); }, function () { return console.log('complete'); });
a$.next('b');
a$.next('c');
a$.next('d');
// zip(d, to
setTimeout(function () {
    console.log('aaa');
    a$.next('b');
    a$.next('c');
    a$.next('d');
    a$.next('b');
    a$.next('c');
    a$.next('d');
    a$.next('b');
    a$.next('c');
    a$.next('d');
    a$.next('b');
    a$.next('c');
    a$.next('d');
    //  toggle$.next(false)
}, 10000);
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
