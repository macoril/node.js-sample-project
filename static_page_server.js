var PORT = 8888;
var HOSTNAME = '127.0.0.1';

var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

http.createServer(function (req, res) {
  var Response = {
    "200": function(file, filename) {
      var header = {
        "Pragma": "no-cache"
      , "Cache-Control": "no-cache"
      }
      res.writeHead(200, header);
      res.write(filename + '\n');
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
      console.log(err);
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

  function f (filename) {
    fs.readFile(filename, "binary", function(err, file) {
      if (err) {
        Response["500"](err);
        return;
      }
      Response["200"](file, filename);
    });
  }

  fs.stat(filename, function(err, stats) {
    console.log("path: " + filename);
    console.log("e: " + err);
    if (err) {
      Response["404"]();
      return;
    }

    console.log(stats);

    if (stats.isDirectory()) {
      fs.stat(filename + '/index.html', function(err, stats) {
        if (!err) {
          filename += '/index.html';
          //XXX duplicated
          console.log('1' + filename);
          f (filename);
        } else {
          fs.readdir('.', function(err,files) {
            if (err) throw err;
            Response["200"](files.join('\n').toString(), filename);
            return;
          });
        }
      });
    } else {
      //XXX duplicated
      console.log('2' + filename);
      f (filename);
    }

  });
}).listen(PORT);


console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');
