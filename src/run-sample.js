"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var timeStamp = Date.now();
var K = 1000;
var INTERVAL = K;
var a$ = new rxjs_1.BehaviorSubject('a');
var toggle$ = new rxjs_1.BehaviorSubject(true);
var remainingSeconds$ = toggle$.pipe(operators_1.switchMap(function (running) {
    return running ? rxjs_1.timer(0, INTERVAL) : rxjs_1.NEVER;
}), operators_1.takeWhile(function (t) {
    // console.log('t', Date.now())
    // console.log('t', timeStamp)
    // console.log('t')
    if (Date.now() > timeStamp + 2000) {
        console.log('quit');
        toggle$.next(false);
    }
    return t >= 0;
}));
remainingSeconds$.subscribe(function (e) { return console.log('e', e); });
rxjs_1.zip(remainingSeconds$, a$)
    .subscribe(function (e) {
    // toggle$.next(true)
    console.log('--', e, timeStamp);
    timeStamp = Date.now();
}, function (err) { return console.log(err); }, function () { return console.log('complete'); });
a$.next('bbbbbb');
a$.next('c');
a$.next('z');
a$.next('b');
var arr = ['a', 'b', 'c', 'z'];
setTimeout(function () {
    console.log('aaa');
    toggle$.next(true);
    // arr.forEach( (e: any) => a$.next(e))
    a$.next('aaaa');
    a$.next('b');
    a$.next('c');
    // toggle$.next(false)
}, 10000);
setTimeout(function () {
    console.log('vvv');
    toggle$.next(true);
    arr.forEach(function (e) { return a$.next(e); });
    a$.next('vvv');
    a$.next('b');
    a$.next('c');
    // toggle$.next(false)
}, 20000);
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
