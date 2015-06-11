var path = require('path');

module.exports = Controller;

function Controller(injector) {
    this.models = null;

    injector.injectInto(this);
}

Controller.prototype.render = function(req, res, template, params) {
	params = params || {};

    params.AppTitle = (typeof process.env.APP_TITLE !== 'undefined') ? process.env.APP_TITLE : '';
    params.Sitemap = require('../app/config/sitemap')();

	res.render(this.getTemplatePath(template), params);
};

Controller.prototype.getTemplatePath = function(template) {
    return this.name + path.sep + template;
};