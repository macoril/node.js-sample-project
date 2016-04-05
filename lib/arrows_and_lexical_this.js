"use strict";

// Expression bodies
var evens = [2, 4, 6, 8, 10];
var odds = evens.map(function (v) {
  return v + 1;
});
var nums = evens.map(function (v, i) {
  return v + i;
});

// Statement bodies
var fives = [1, 2, 3, 4, 5];
nums.forEach(function (v) {
  if (v % 5 === 0) fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends: function printFriends() {
    var _this = this;

    this._friends.forEach(function (f) {
      return console.log(_this._name + " knows " + f);
    });
  }
};

console.log(evens);
console.log(odds);
console.log(nums);
console.log(fives);
console.log(bob);