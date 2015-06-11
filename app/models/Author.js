var Util = require('util');
var Model = require('../../lib/Model');
var mongoose = require('mongoose');

module.exports = MyModel;
Util.inherits(MyModel, Model);

function MyModel(injector) {
    Model.call(this, injector);

    this.name = 'Author';

    this.schema = this.createSchema({
        name: String,
        email: String,
        posts: [{type: mongoose.Schema.Types.ObjectId, ref:'Post'}]
    });
}