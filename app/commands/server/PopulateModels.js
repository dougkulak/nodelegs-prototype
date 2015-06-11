var Util = require('util');
var Command = require('../../../lib/Command');
var _ = require('underscore')._;

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);

    this.injector = injector;
    this.models = null;

    injector.injectInto(this);
}

MyCommand.prototype.execute = function() {
    var async = require('async');

    var asyncCallbacks = [];

    _.each(this.models, function(model) {
        asyncCallbacks.push(function(cb) {
            model.prepopulate(cb);
        });
    });

    var self = this;
    async.parallel(asyncCallbacks, function(err) {
        if (err) {
            console.error(err);
        }

        self.dispatch('POPULATE_MODELS_COMPLETE');
    });
};