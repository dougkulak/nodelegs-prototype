var Injector = require('medic-injector').Injector;
var CommandMap = require('./CommandMap');
var EventDispatcher = require('./EventDispatcher');
var Express = require('express');
module.exports = Context;

function Context() {
    this.injector = new Injector();
    this.eventDispatcher = new EventDispatcher();

    this.injector.addMapping('eventDispatcher').toValue(this.eventDispatcher);

    this.commandMap = new CommandMap(this.injector);

    return this;
}

Context.prototype.startup = function() {
    this.eventDispatcher.emit('STARTUP_COMPLETE');
};

Context.prototype.shutdown = function() {
    this.eventDispatcher.emit('SHUTDOWN_COMPLETE');
};