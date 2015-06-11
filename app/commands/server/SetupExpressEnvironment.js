var Util = require('util');
var Command = require('../../../lib/Command');
var express = require('express');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);

    this.app = null;

    injector.injectInto(this);
}

MyCommand.prototype.execute = function() {
    require('../../config/environment')(this.app);

    this.dispatch('SETUP_EXPRESS_ENVIRONMENT_COMPLETE');
};