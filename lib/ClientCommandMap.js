module.exports = ClientCommandMap;

function ClientCommandMap(injector) {
    this.eventDispatcher = null;
    this.injector = injector;

    injector.injectInto(this);
}

ClientCommandMap.prototype.mapEvent = function(eventName, Command) {
    var self = this;

    var oneShot = (arguments.length >= 3) ? arguments[2] : false;

    var callback = function() {
        if (typeof Command === "string") {
            Command = require('../app/commands/' + Command);
        }

        var command = new Command(self.injector);

        try {
            if (typeof command.execute === "function") {
                command.execute.apply(command, arguments);
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (oneShot) {
        // TODO : Add oneShot functionality -- should keep events in array then remove them after firing
        this.eventDispatcher.socket.on(eventName, callback);
    } else {
        this.eventDispatcher.socket.on(eventName, callback);
    }
};