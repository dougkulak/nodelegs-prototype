var Util = require('util');
var Model = require('../../lib/Model');
var mongoose = require('mongoose');

module.exports = MyModel;
Util.inherits(MyModel, Model);

function MyModel(injector) {
    Model.call(this, injector);

    this.name = 'Post';

    this.schema = this.createSchema({
        title: String,
        body: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref:'Author'}
    });
}