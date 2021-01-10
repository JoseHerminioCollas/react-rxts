"use strict";
exports.__esModule = true;
var timerEngine = function (listener) {
    var messages = [];
    var intervalHandle;
    var isRunning = false;
    var run = function () {
        if (isRunning)
            return;
        isRunning = true;
        intervalHandle = setInterval(function () {
            var e = messages.pop();
            if (!e) {
                isRunning = false;
                clearInterval(intervalHandle);
            }
            else {
                listener(e);
            }
        }, 1000);
    };
    var add = function (message) {
        if (!isRunning) {
            run();
            // isRunning = true
        }
        messages.unshift(message);
    };
    return { add: add };
};
exports["default"] = timerEngine;
