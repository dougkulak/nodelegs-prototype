module.exports = CommandMap;

function CommandMap(injector) {
    this.eventDispatcher = null;
    this.injector = injector;

    injector.injectInto(this);
}

CommandMap.prototype.mapEvent = function(eventName, Command) {
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
        this.eventDispatcher.once(eventName, callback);
    } else {
        this.eventDispatcher.on(eventName, callback);
    }
};