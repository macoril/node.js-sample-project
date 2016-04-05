"use strict";

var x = 1;
var y = 1;

console.log(x, y); // 1 1

if (true) {
  var x = 2;
  var _y = 2;
  console.log(x, _y); // 2 2
}

console.log(x, y); // 2 1