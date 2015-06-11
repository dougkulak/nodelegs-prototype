module.exports = ClientCommand;
function ClientCommand(injector) {
    this.eventDispatcher = null;

    injector.injectInto(this);
}

ClientCommand.prototype.execute = function() {
    throw new Error("The Command.execute() method must be overridden.");
};

ClientCommand.prototype.dispatch = function(event, data) {
    this.eventDispatcher.dispatch(event, data);
};

ClientCommand.prototype.dispatchAll = function(event, data) {
    this.eventDispatcher.dispatchAll(event, data);
};

ClientCommand.prototype.dispatchAllExceptSelf = function(event, data) {
    this.eventDispatcher.dispatchAllExceptSelf(event, data);
};