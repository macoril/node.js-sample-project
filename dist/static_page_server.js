"use strict";

var PORT = 8888;
var HOSTNAME = '127.0.0.1';

var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var co = require("co");

http.createServer(function (req, res) {
  var Response = {
    "200": function _(content) {
      var header = {
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
      };
      console.log(200);
      console.log(content);
      res.writeHead(200, header);
      res.write(content, "binary");
      res.end();
    },
    "404": function _() {
      var header = {
        "Content-Type": "text/plain"
      };
      console.log(404);
      res.writeHead(404, header);
      res.write("404 Not Found\n");
      res.end();
    },
    "500": function _(err) {
      console.log(err);
      var header = {
        "Content-Type": "text/plain"
      };
      console.log(500);
      res.writeHead(500, header);
      res.write(err + "\n");
      res.end();
    }
  };

  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);

  var f = function f(filename, is_dir) {
    var is_dir = is_dir === undefined ? false : is_dir;

    co(regeneratorRuntime.mark(function _callee() {
      var status_code, content;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              status_code = '';
              content = '';
              _context.next = 4;
              return new Promise(function (resolve, reject) {
                // ディレクトリの場合
                if (is_dir) {
                  fs.readdir(filename, function (err, files) {
                    if (!err) {
                      content = filename + '\n\n';
                      content += files.join('\n').toString();
                      resolve();
                    } else {
                      reject(err);
                    }
                  });

                  // ファイルの場合
                } else {
                    fs.readFile(filename, "binary", function (err, file) {
                      if (!err) {
                        content = file;
                        resolve();
                      } else {
                        reject(err);
                      }
                    });
                  }
              }).then(function onResolved() {
                console.log('onRes');
                status_code = 200;
              }, function onRejected(err) {
                console.log('onRej');
                content = err;
                status_code = 500;
              });

            case 4:

              console.log('response!');
              Response[status_code](content);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return;
  };

  fs.stat(filename, function (err, stats) {
    console.log("path: " + filename);
    console.log("e: " + err);
    // ファイルもディレクトリもない
    if (err) {
      Response["404"]();
      return;
    }

    console.log(stats);

    if (stats.isFile()) {
      f(filename);
    } else if (stats.isDirectory()) {
      new Promise(function (resolve, reject) {
        fs.stat(filename + '/index.html', function (err, stats) {
          var is_dir = true;
          if (!err) {
            is_dir = false;
            filename += '/index.html';
            console.log('1' + filename);
          }
          resolve(is_dir);
        });
      }).then(function (is_dir) {
        return f(filename, is_dir);
      });
    }
  });
}).listen(PORT);

console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');