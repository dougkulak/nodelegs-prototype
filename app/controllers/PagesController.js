var Util = require('util');
var Controller = require('../../lib/Controller');
var Injector = require('medic-injector').Injector;
var RenderAction = require('../../lib/RenderAction');

module.exports = MyController;
Util.inherits(MyController, Controller);

function MyController(injector) {
    Controller.call(this, injector);

    this.name = 'Pages';
}

MyController.prototype.homeOldWay = function(req, res) {
    var self = this;

    this.models['Author'].find({}).exec(function(err, authors) {
        self.render.apply(self, [req, res, 'home', {authors: authors}]);
    });
};

MyController.prototype.home = function(req, res) {
    var self = this;
    var injector = new Injector();

    injector.addMapping('authors').toProvider(function(callback) {
        self.models['Author'].find({}).populate('posts').exec(function(err, results) {
            callback(results);
        });
    });

    injector.addMapping('posts').toProvider(function(callback) {
        self.models['Post'].find({}).populate('author').exec(function(err, results) {
            callback(results);
        });
    });

    return new RenderAction('home', this, injector, arguments);
};