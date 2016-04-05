var fs = require("fs");
var co = require('co');

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

co (function *() {
  yield new Promise(function(resolve, reject) {
    fs.stat('helloworld1.js', function(err, stats) {
      console.log('1');
      resolve();
    });
  });

  yield new Promise(function(resolve, reject) {
    fs.stat('helloworld2.js', function(err, stats) {
      console.log('2');
      resolve();
    });
  });

  console.log('3');
  f1 ();
});

console.log('7');
