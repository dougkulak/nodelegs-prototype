var Util = require('util');
var Command = require('../../../lib/Command');
var express = require('express');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);

    this.injector = injector;
    this.app = null;

    injector.injectInto(this);
}

MyCommand.prototype.execute = function() {
    require('../../config/routes')(this);

    this.dispatch('CONFIGURE_EXPRESS_ROUTES_COMPLETE');
};

MyCommand.prototype.get = function(path, controllerPath) {
    if (process.env.HTTP_AUTH_ENABLED === "true") {
        var auth = express.basicAuth(function(user, pass) {
            return (user == process.env.HTTP_AUTH_USERNAME && pass == process.env.HTTP_AUTH_PASSWORD);
        }, 'Restricted Area');
    }

    var parts = controllerPath.split('.');
    var controller = new (require('../../controllers/' + parts[0]))(this.injector);
    var action = controller[parts[1]];

    if (typeof auth === 'undefined') {
        this.app.get(path, action.bind(controller));
    } else {
        this.app.get(path, auth, action.bind(controller));
    }
};