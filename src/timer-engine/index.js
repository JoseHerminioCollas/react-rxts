"use strict";
exports.__esModule = true;
var timerEngine = function (listener) {
    var callBack = listener;
    var messages = [];
    var h;
    var isRunning = false;
    var run = function () {
        if (isRunning)
            return;
        h = setInterval(function () {
            var e = messages.pop();
            if (!e) {
                isRunning = false;
                clearInterval(h);
            }
            else {
                callBack(e);
            }
        }, 1000);
    };
    var add = function (message) {
        if (!isRunning) {
            run();
            isRunning = true;
        }
        messages.unshift(message);
    };
    return { add: add };
};
// /////////////////
// const tE = timerEngine((e: string) => {
//     console.log('message:', e)
// })
// tE.add('a')
// tE.add('b')
// tE.add('c')
// tE.add('d')
// setTimeout(() => {
//     console.log('add')
//     tE.add('a')
//     tE.add('a')
//     tE.add('b')
//     tE.add('c')
//     tE.add('d')
//     }, 10000)
exports["default"] = timerEngine;
