var express = require('express');

var exports = module.exports = function(app) {
    app.configure('development', function() {
        app.use(express.logger('dev'));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function() {
        app.use(express.errorHandler());
    });

    app.set('views', __dirname + '/../views');
    app.set('view engine', 'hbs');
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/../../public'));
    app.use(express.cookieParser());
    app.use(express.cookieSession({secret: process.env.COOKIE_SECRET}));
    app.use(app.router);
};