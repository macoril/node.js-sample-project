var fs = require("fs");

var f1 = function () {
  console.log('4');
  new Promise(function(resolve, reject) {
    fs.readdir('.', function(err, files) {
      console.log('5');
      resolve();
    });
  }).then (function() {
    console.log('6');
  });
  return;
}

Promise.resolve()
  .then (function() {
    return new Promise(function(resolve, reject) {
      fs.stat('helloworld1.js', function(err, stats) {
        console.log('1');
        resolve();
      });
    });
  }).then (function() {
    return new Promise(function(resolve, reject) {
      fs.stat('helloworld2.js', function(err, stats) {
        console.log('2');
        resolve();
      });
    });
  }).then (function() {
    console.log('3');
    f1 ();
  });

console.log('7');
