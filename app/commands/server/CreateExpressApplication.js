var Util = require('util');
var Command = require('../../../lib/Command');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);

    this.injector = injector;
}

MyCommand.prototype.execute = function() {
    var app = require('express')();

    this.injector.addMapping('app').toValue(app);

    this.dispatch('CREATE_EXPRESS_APPLICATION_COMPLETE');
};