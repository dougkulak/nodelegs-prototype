var Util = require('util');
var Controller = require('../../lib/Controller');
var Injector = require('medic-injector').Injector;
var RenderAction = require('../../lib/RenderAction');

module.exports = MyController;
Util.inherits(MyController, Controller);

function MyController(injector) {
    Controller.call(this, injector);

    this.name = 'Authors';
}

MyController.prototype.index = function(req, res) {
    var self = this;
    var injector = new Injector();

    injector.addMapping('authors').toProvider(function(callback) {
        self.models['Author'].find({}).populate('posts').exec(function(err, results) {
            callback(results);
        });
    });

    return new RenderAction('index', this, injector, arguments);
};