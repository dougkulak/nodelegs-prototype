var Util = require('util');
var Command = require('../../../lib/Command');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    this.injector = injector;
    Command.call(this, injector);
}

MyCommand.prototype.execute = function() {
    var mongoose = require('mongoose');

    mongoose.connect(this.getConnectionString());

    var self = this;
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.once('open', function() {
        self.injector.addMapping('db').toValue(mongoose.connection);
        self.dispatch('CONNECT_DATABASE_COMPLETE');
    });

    // gracefully close connection when application exits
    process.stdin.resume();
    process.on('SIGINT', function() {
        mongoose.connection.close();
        process.exit();
    });
};

MyCommand.prototype.getConnectionString = function() {
    var connStr = 'mongodb://';

    if (process.env.NODE_DB_USERNAME.length && process.env.NODE_DB_PASSWORD.length) {
        connStr += process.env.NODE_DB_USERNAME + ':' + process.env.NODE_DB_PASSWORD + '@';
    }
    connStr += process.env.NODE_DB_HOST.length ? process.env.NODE_DB_HOST : 'localhost';
    connStr += process.env.NODE_DB_PORT.length ? ':' + process.env.NODE_DB_PORT : '';
    connStr += '/' + process.env.NODE_DB_DATABASE;

    return connStr;
};
