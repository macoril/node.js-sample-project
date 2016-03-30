process.stdin.resume();
process.stdin.setEncoding('utf8');

// your code goes here
(function() {
  'use strict';

  var lines = [];
  require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('line', function(line) {
    lines.push(line);
  });


  process.stdin.on('end', function() {
    console.log(lines); // 全て
    lines.forEach(function(line) {
      console.log(line); // 一行ずつ
    });
  });
})();
