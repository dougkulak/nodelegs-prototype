var Util = require('util');
var fs = require('fs');
var Command = require('../../../lib/Command');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);

    this.injector = injector;
    this.db = null;

    injector.injectInto(this);
}

MyCommand.prototype.execute = function() {
    var models = {};

    var files = fs.readdirSync('./app/models');

    for (var i = files.length - 1; i >= 0; i--) {
        var file = files[i];
        // remove directories from array
        if (file.indexOf('.js') === -1) {
            files.splice(i, 1);
        } else {
            // remove .js extension
            files[i] = file.replace(/.js/, '');
        }
    }

    for (var i in files) {
        var model = new (require('../../models/' + files[i]))(this.injector);
        models[files[i]] = this.db.model(model.name, model.schema);
    }

    this.injector.addMapping('models').toValue(models);

    this.dispatch('PREPARE_MODELS_COMPLETE');
};