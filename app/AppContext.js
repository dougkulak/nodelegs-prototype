var Context = require('../lib/Context');
var Util = require('util');

module.exports = AppContext;
Util.inherits(AppContext, Context);

function AppContext() {
    Context.call(this);
}

AppContext.prototype.startup = function() {
    new (require('./bootstraps/ServerBootstrap'))(this['commandMap']);

    this['eventDispatcher'].emit('STARTUP_COMPLETE');
};