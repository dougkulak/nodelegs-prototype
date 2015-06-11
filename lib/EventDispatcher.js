var EventEmitter = require('events').EventEmitter;
var Util = require('util');

module.exports = EventDispatcher;
Util.inherits(EventDispatcher, EventEmitter);

function EventDispatcher() {
    EventEmitter.call(this);
}

EventDispatcher.prototype.emit = function(event) {
    console.log('[EventDispatcher] emit(): ' + event);

    if (arguments.length == 1) {
        EventDispatcher.super_.prototype.emit.apply(this, [event]);
    } else {
        EventDispatcher.super_.prototype.emit.apply(this, [event, arguments[1]]);
    }
};