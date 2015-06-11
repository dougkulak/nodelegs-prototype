var _ = require('underscore')._;

module.exports = EventDispatcher;

function EventDispatcher(io, socket) {
    this.io = io;
    this.socket = socket;
}

EventDispatcher.prototype.dispatch = function(event, data) {
    console.log('[ClientEventDispatcher] dispatch(): ' + event);
    this.socket.emit(event, data);
};

EventDispatcher.prototype.dispatchAll = function(event, data) {
    console.log('[ClientEventDispatcher] dispatchAll(): ' + event);
    this.io.sockets.emit(event, data);
};

EventDispatcher.prototype.dispatchAllExceptSelf = function(event, data) {
    console.log('[ClientEventDispatcher] dispatchAllExceptSelf(): ' + event);
    this.socket.broadcast.emit(event, data);
};

/*
 // send to current request socket client
 socket.emit('message', "this is a test");

 // sending to all clients, include sender
 io.sockets.emit('message', "this is a test");

 // sending to all clients except sender
 socket.broadcast.emit('message', "this is a test");

 // sending to all clients in 'game' room(channel) except sender
 socket.broadcast.to('game').emit('message', 'nice game');

 // sending to all clients in 'game' room(channel), include sender
 io.sockets.in('game').emit('message', 'cool game');

 // sending to individual socketid
 io.sockets.socket(socketid).emit('message', 'for your eyes only');
 */