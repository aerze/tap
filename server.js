var path = require('path');
var http = require('http');

var express = require('express');

var app = express();
var server = http.Server(app);

listener = server.listen(8888, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use(express.static(path.join(__dirname, '/dist')));
