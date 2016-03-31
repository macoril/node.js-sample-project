var PORT = 8888;
var HOSTNAME = '127.0.0.1';

var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

http.createServer(function (req, res) {
  var Response = {
    "200": function(file, filename) {
      var extname = path.extname(filename);
      var header = {
        "Pragma": "no-cache"
      , "Cache-Control": "no-cache"
      }
      res.writeHead(200, header);
      res.write(file, "binary");
      res.end();
    }
    , "404": function() {
      var header = {
        "Content-Type": "text/plain"
      }
      res.writeHead(404, header);
      res.write("404 Not Found\n");
      res.end();
    }
    , "500": function(err) {
      var header = {
        "Content-Type": "text/plain"
      }
      res.writeHead(500, header);
      res.write(err + "\n");
      res.end();
    }
  }

  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    console.log(filename + " " + exists);
    if (!exists) {
      Response["404"]();
      return;
    }
    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
    }

    fs.readFile(filename, "binary", function(err, file) {
      if (err) {
        Response["500"](err);
        return;
      }
      Response["200"](file, filename);
    });
  });
}).listen(PORT);

console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');