'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');
var socketIO = require('socket.io');
var mongoose = require('mongoose');


// start mongoose
mongoose.connect('mongodb://localhost/sit');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	/* test schema */
    var testSchema = new mongoose.Schema({
        test: String
    });

    var Test = mongoose.model( 'test', testSchema );

    /* set Baucis */
    baucis.rest({
        singular: 'test'
    });

	var app = express();

	app.configure(function(){
	    app.set('port', 9000);

	    app.set('view engine', 'handlebars');
	    app.set('views', __dirname + '../app/scripts/views');
	});

    app.use('/api/v1', baucis());

	// simple log
	app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});

	// mount static
	app.use(express.static( path.join( __dirname, '../app') ));
	app.use(express.static( path.join( __dirname, '../.tmp') ));


	// route index.html
	app.get('/', function(req, res){
	  res.sendfile( path.join( __dirname, '../app/index.html' ) );
	});

	// start server
	var server =http.createServer(app)

	var io = socketIO.listen(server)

	server.listen(app.get('port'), function(){
	    console.log('Express App started!');
	});

	// id's present only for future app logic
	var users = {};
	var idHash = {};
	var currentID = 1;

	io.sockets.on('connection', function(socket) {
		
		socket.on('new:user', function (username, callback) {
			if (username in users) {
				callback({error: {type: "user:exists"}});
			} else {
				var data = {
					id: currentID,
					username: username
				};
				socket.username = username;
				socket.idnumber = currentID;
				users[username] = socket;
				idHash[currentID] = username;
				currentID += 1;

				callback(data);
				socket.broadcast.emit('user:connected', data);
			}
		});

		socket.on('request:user:list', function (callback) {
			callback(idHash);
		});

		socket.on('send:message', function  (data) {
			var reciverUsername = idHash[data.reciver],
				reciver = users[reciverUsername];
			
			if (reciver) {
				reciver.emit('incoming:message', {
					sender: socket.idnumber, 
					message: data.msg 
				});
			}
		});

		socket.on('send:chat:message', function (data) {
			// data.sender = socket.idnumber;
			// TODO: add message validation before emitting
			socket.broadcast.emit('incoming:chat:message', data);
		});

		socket.on('disconnect', function () {
			var id = socket.idnumber
			delete idHash[id];
			delete users[socket.username];
			socket.broadcast.emit('user:disconnected', id)
		});
	});
});


