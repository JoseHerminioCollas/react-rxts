"use strict";
exports.__esModule = true;
var index_1 = require("./index");
// console.log('test')
// describe('timer engine', () => {
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
// console.log('test')
// it('should', () => {
//     expect(0).toBe(0)
// })
// })
