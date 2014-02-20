define(['app', 'socketio'], function(AppManager){
	//communication between websockets and application
	
	socket = io.connect();

	AppManager.reqres.setHandler('login:permission', function (username) {
		var deferred = $.Deferred();
		
		// gives server 3sec to response
		setTimeout(function () {
			deferred.resolve({error: {type: 'connection error'}});
		}, 3000);

		//asks registers new user on server and resolves on response
		var data = socket.emit('new:user', username, function (resp) {
			deferred.resolve(resp);
		});

		return deferred.promise();
	});

	AppManager.reqres.setHandler('user:list', function () {
		var deferred = $.Deferred();

		//gives server 3sec to response
		setTimeout(function () {
			deferred.resolve({error: {type: 'connection error'}});
		}, 3000);

		var data = socket.emit('request:user:list', function (resp) {
			deferred.resolve(resp);
		});

		return deferred.promise();
	});

	AppManager.on('send:message', function(data) {
		// data: {sender, reciver, message object}
		socket.emit('send:message', data);
	});

	AppManager.on('send:chat:message', function (data) {
		// data: {sender, message object}
		socket.emit('send:chat:message', data);
	});

	socket.on('user:connected', function (data) {
		// data: {id, username}
		AppManager.trigger('user:connected', data);
	});

	socket.on('incoming:message', function  (data) {
		AppManager.trigger('incoming:message', data);
	});

	socket.on('incoming:chat:message', function  (data) {
		AppManager.trigger('incoming:chat:message', data);
	});

	socket.on('user:disconnected', function (id) {
		AppManager.trigger('user:disconnected', id);
	});

	return;
});