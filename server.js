// server.js
var app = require('./app');
var port = 80;
//process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('todo list RESTful API server started on: ' + port);
});
