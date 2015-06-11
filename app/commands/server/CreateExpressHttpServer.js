var Util = require('util');
var Command = require('../../../lib/Command');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);
    this.injector = injector;
    this.app = null;

    injector.injectInto(this);
}

MyCommand.prototype.execute = function() {
    var self = this;
    var server = require('http').createServer(this.app).listen(process.env.PORT, function() {
        console.log('Express server listening on port ' + process.env.PORT + ' in ' + process.env.NODE_ENV + ' mode');
        self.injector.addMapping('server').toValue(server);
        self.dispatch('CREATE_EXPRESS_HTTP_SERVER_COMPLETE', server);
    });
};