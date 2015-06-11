module.exports = Action;
function Action(template, controller, injector, parentArguments) {
    for (var mapping in injector._mappings) {
        this[mapping] = null;
    }

    this.controller = controller;
    this.req = parentArguments[0];
    this.res = parentArguments[1];
    this.template = template;
    this.injector = injector;

    injector.injectInto(this);
}

Action.prototype.postInjections = function() {
    var params = {};
    for (var mapping in this.injector._mappings) {
        params[mapping] = this[mapping];
    }
    this.controller.render.apply(this.controller, [this.req, this.res, this.template, params]);
};