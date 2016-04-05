var x = 1;
let y = 1;

console.log(x, y); // 1 1

if (true) {
  var x = 2;
  let y = 2;
  console.log(x, y); // 2 2
}

console.log(x, y); // 2 1
