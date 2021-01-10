"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var tE = index_1["default"](function (e) {
    console.log('message:', e);
});
tE.add('a');
tE.add('b');
tE.add('c');
tE.add('d');
setTimeout(function () {
    console.log('add');
    tE.add('a');
    tE.add('a');
    tE.add('b');
    tE.add('c');
    tE.add('d');
}, 10000);
setTimeout(function () {
    console.log('add');
    tE.add('xxxxxx');
    tE.add('zzzzz');
    tE.add('bbb');
    tE.add('ccc');
    tE.add('ddd');
}, 20000);
