var Util = require('util');
var Command = require('../../../lib/Command');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);
    this.injector = injector;
}

MyCommand.prototype.execute = function(server) {
    var io = require('socket.io').listen(server, {log: false});

    var self = this;
    io.sockets.on('connection', function(socket) {
        self.dispatch('SOCKET_CONNECTION_COMPLETE', socket);
    });

    this.injector.addMapping('io').toValue(io);

    this.dispatch('SETUP_SOCKET_SERVER_COMPLETE');
};
