var PORT = 8080;
var HOSTNAME = '127.0.0.1';

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>hi!\n\n\n\n\n\nEveryone!!</h1>'); //タグが有効な代わりに\nは効かない
  res.write('<h2>Hello World</h2>');
  res.end();
}).listen(PORT);

console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');
