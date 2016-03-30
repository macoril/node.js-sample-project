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
    stdout_lines(lines);
  });

  // パイプやリダイレクトで入力を渡す場合は呼ばれるが、
  // node ideone.js を実行したあと入力を行い
  // Ctrl+C や Ctrl+d をした場合には呼ばれない様子
  process.stdin.on('end', function() {
    console.log('ended!')
    stdout_lines(lines);
  });
})();

function stdout_lines(lines) {
  console.log('lines: '+lines); // 全て
  lines.forEach(function(line, i) {
    console.log('line '+i+': '+line); // 一行ずつ
  });
}
