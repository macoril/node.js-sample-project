const sys = require('util'),
      express = require('express'),
      app = express(),
      http = require('http'),
      server = http.createServer(app),
      io = require('socket.io'),
      TwitterNode = require('twitter-node').TwitterNode;

// express
//app.configure(function() {
  app.use(express.static(__dirname + '/views'));
//});
server.listen(8888);

//socket.io
const socket = io.listen(app);

// twitter
var twitter = new TwitterNode({
    user: ''
  , password: ''
  , track: ['馬']
});

twitter
  .addListerner('tweet', function(tweet) {
    socket.broadcast(tweet.text);
  })
  .stream();
