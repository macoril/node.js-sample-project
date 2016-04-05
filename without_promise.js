var fs = require("fs");

var f1 = function () {
  console.log('4');
  fs.readdir('.', function(err, files) {
    console.log('5');
  });
  console.log('6');
  return;
}

fs.stat('helloworld1.js', function(err, stats) {
  console.log('1');

  fs.stat('helloworld2.js', function(err, stats) {
    console.log('2');
  });
  console.log('3');
  f1 ();

});
