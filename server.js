var express = require('express');
var bodyParser= require("body-parser");
var path = require('path');
const passport = require('passport');
var app = express();
const mongoose = require('mongoose');
 var db= require("./models/connection.js");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(passport.initialize());
require('./server/auth/auth.js');
var port = 8080;
const server=app.listen(port, ()=>{
    console.log(' opened the gates on port ' + port);
});
var io = require('socket.io')(server);



const router= require('./server/routes/routes.js')(io);
const secureRoute = require('./server/routes/secure-routes')(io);

app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );


app.use('/', router);

app.use('/client', express.static(path.join(__dirname, '/client')));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/client' + '/index.html');
	console.log("incerccc");
});



io.on('connection', function(socket){
    console.log('a user connected '+ socket.id);
  
  socket.on('addPoint',  (data) => {
  io.emit('addPoint',data);
  });
})
module.exports=app;
