// Expression bodies
const evens = [2,4,6,8,10];
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// Statement bodies
var fives = [1,2,3,4,5];
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};

console.log(evens);
console.log(odds);
console.log(nums);
console.log(fives);
console.log(bob);
