const PORT = 8888;
const HOSTNAME = '127.0.0.1';

const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const co = require("co");

http.createServer((req, res) => {
  const Response = {
    "200": (content) => {
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
    , "404": () => {
      var header = {
        "Content-Type": "text/plain"
      }
      console.log(404);
      res.writeHead(404, header);
      res.write("404 Not Found\n");
      res.end();
    }
    , "500": (err) => {
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

  var f = (filename, is_dir) => {
    var is_dir = (is_dir === undefined) ? false : is_dir;

    co (function *() {
      var status_code = '';
      var content = '';

      yield new Promise((resolve, reject) => {
        // ディレクトリの場合
        if (is_dir) {
          fs.readdir(filename, (err, files) => {
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
          fs.readFile(filename, "binary", (err, file) => {
            if (!err) {
              content = file;
              resolve();
            } else {
              reject(err);
            }
          });
        }

      }).then(
        function onResolved() {
          console.log('onRes');
          status_code = 200;
        }
        , function onRejected(err) {
          console.log('onRej');
          content = err;
          status_code = 500;
        }
      );

      console.log('response!');
      Response[status_code](content);
    });

    return ;
  }

  fs.stat(filename, (err, stats) => {
    console.log("path: " + filename);
    console.log("e: " + err);
    // ファイルもディレクトリもない
    if (err) {
      Response["404"]();
      return;
    }

    console.log(stats);

    if (stats.isFile()) {
      f (filename);
    } else if (stats.isDirectory()) {
      new Promise((resolve, reject) => {
        fs.stat(filename + '/index.html', (err, stats) => {
          var is_dir = true;
          if (!err) {
            is_dir = false;
            filename += '/index.html';
            console.log('1' + filename);
          }
          resolve(is_dir);
        });
      }).then(is_dir => f (filename, is_dir) );
    }
  });

}).listen(PORT);


console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');
