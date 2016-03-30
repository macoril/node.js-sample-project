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
    console.log('line: '+line);
    lines.push(line);
  }).on('close', function() {
    console.log('closed!')
    console.log('lines: '+lines); // 全て
    lines.forEach(function(line, i) {
      console.log('line '+i+': '+line); // 一行ずつ
    });
  });


  process.stdin.on('end', function() {
  });
})();
