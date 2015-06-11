var Util = require('util');
var Controller = require('../../lib/Controller');
var Injector = require('medic-injector').Injector;
var RenderAction = require('../../lib/RenderAction');

module.exports = MyController;
Util.inherits(MyController, Controller);

function MyController(injector) {
    Controller.call(this, injector);

    this.name = 'Posts';
}

MyController.prototype.index = function(req, res) {
    var self = this;
    var injector = new Injector();

    injector.addMapping('posts').toProvider(function(callback) {
        self.models['Post'].find({}).populate('author').exec(function(err, results) {
            callback(results);
        });
    });

    return new RenderAction('index', this, injector, arguments);
};