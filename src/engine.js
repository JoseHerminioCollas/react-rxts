"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var a$ = new rxjs_1.BehaviorSubject('a');
var toggle$ = new rxjs_1.BehaviorSubject(true);
var timerEngine = function () {
    var timeStamp = Date.now();
    var K = 1000;
    var INTERVAL = K;
    var timerEngine$ = toggle$.pipe(operators_1.switchMap(function (running) { return running ? rxjs_1.timer(0, INTERVAL) : rxjs_1.NEVER; }), operators_1.takeWhile(function (t) {
        if (Date.now() > timeStamp + 2000) {
            console.log('quit');
            toggle$.next(false);
        }
        return t >= 0;
    }));
    // timerEngine$.subscribe(e => console.log('e', e))
    var z = rxjs_1.zip(timerEngine$, a$);
    z.subscribe(function (eA) {
        toggle$.next(true);
        console.log('eA', eA);
    });
    return z;
    // .subscribe(e => {
    //     // toggle$.next(true)
    //     console.log('--', e, timeStamp)
    //     timeStamp = Date.now()
    // },
    //     err => console.log(err),
    //     () => console.log('complete')
    // )
};
//////////
timerEngine().subscribe(function (e) { return console.log('x', e); });
//////
a$.next('bbbbbb');
a$.next('c');
a$.next('z');
a$.next('b');
var arr = ['a', 'b', 'c', 'z'];
setTimeout(function () {
    console.log('aaa');
    toggle$.next(true);
    a$.next('aaaa');
    a$.next('b');
    a$.next('c');
}, 10000);
setTimeout(function () {
    console.log('vvv');
    toggle$.next(true);
    // arr.forEach((e: any) => a$.next(e))
    a$.next('vvv');
    a$.next('b');
    a$.next('c');
}, 20000);
