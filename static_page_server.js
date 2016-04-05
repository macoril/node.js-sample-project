var PORT = 8888;
var HOSTNAME = '127.0.0.1';

var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

http.createServer(function (req, res) {
  var Response = {
    "200": function(content) {
      var header = {
        "Pragma": "no-cache"
      , "Cache-Control": "no-cache"
      }
      console.log(200);
      console.log(content);
      res.writeHead(200, header);
      res.write(content, "binary");
      res.end();
    }
    , "404": function() {
      var header = {
        "Content-Type": "text/plain"
      }
      console.log(404);
      res.writeHead(404, header);
      res.write("404 Not Found\n");
      res.end();
    }
    , "500": function(err) {
      console.log(err);
      var header = {
        "Content-Type": "text/plain"
      }
      console.log(500);
      res.writeHead(500, header);
      res.write(err + "\n");
      res.end();
    }
  }

  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);

  var f = function(filename) {
    var status_code = 200;
    var content = '';

    return new Promise(function(resolve, reject) {
      fs.readFile(filename, "binary", function(err, file) {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    })
    .then(
      function onResolved(file) {
        content = file;
      }
      , function onRejected(err) {
        return new Promise(function(resolve, reject) {
          fs.readdir(filename, function(err, files) {
            if (!err) {
              content = filename + '\n\n';
              content += files.join('\n').toString()
            } else {
              content = err;
              status_code = 500;
            }
            resolve();
          });
        });
      })
    .then(function () {
      Response[status_code](content);
      resolve();
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

    var is_dir = false;
    return new Promise(function(resolve, reject) {
      if (stats.isDirectory()) {
        is_dir = true;
        fs.stat(filename + '/index.html', function(err, stats) {
          if (!err) {
            is_dir = false;
            filename += '/index.html';
            console.log('1' + filename);
          }
          resolve();
        });
      } else {
        resolve();
      }
    }).then(function () {
      console.log('2' + filename);
      f (filename);
    });
  });

}).listen(PORT);


console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');
