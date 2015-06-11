var Util = require('util');
var Command = require('../../../lib/ClientCommand');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);
}

MyCommand.prototype.execute = function() {
    //this.dispatchAll('USER_HAS_CONNECTED');
    this.dispatchAllExceptSelf('USER_OTHER_THAN_ME_HAS_CONNECTED');
    //this.dispatch('LOG_CLIENT_CONNECTED_COMPLETE');
};
