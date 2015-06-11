var mongoose = require('mongoose');

module.exports = Model;

function Model(injector) {
    this.injector = injector;

    this.eventDispatcher = null;

    injector.injectInto(this);
}

Model.prototype.createSchema = function(schema) {
    var Schema = new mongoose.Schema(schema);

    Schema.statics.prepopulate = function(cb) {
        try {
            var initialData = require('../app/models/initialData/' + this.modelName);
        } catch (e) {}

        if (typeof initialData !== "undefined") {
            this.remove({}).exec();
            this.create(initialData, function(err) {
                cb(err);
            });
        } else {
            cb();
        }
    };

    return Schema;
};