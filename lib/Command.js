module.exports = Command;
function Command(injector) {
    this.eventDispatcher = null;

    injector.injectInto(this);
}

Command.prototype.execute = function() {
    throw new Error("The Command.execute() method must be overridden.");
};

Command.prototype.dispatch = function(event, data) {
    this.eventDispatcher.emit(event, data);
}