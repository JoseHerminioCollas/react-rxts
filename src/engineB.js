"use strict";
// addMessage callback
exports.__esModule = true;
var messages = [];
var h;
var isRunning = false;
var run = function () {
    if (isRunning)
        return;
    h = setInterval(function () {
        if (messages.length === 0) {
            console.log('quit');
            clearInterval(h);
            isRunning = false;
        }
        var e = messages.pop();
        console.log('zz', e);
    }, 1000);
};
var add = function (message) {
    if (!isRunning) {
        run();
        isRunning = true;
    }
    messages.unshift(message);
};
// run()
add('a');
add('b');
add('c');
add('d');
add('e');
setTimeout(function () {
    console.log('add');
    add('a');
    add('b');
    add('c');
    add('d');
    add('e');
    // console.log('a')
}, 10000);
// messages.unshift('a')
// messages.unshift('b')
// messages.unshift('c')
// messages.unshift('d')
exports["default"] = h;
