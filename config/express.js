var express = require('express');
var consign = require('consign');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var expressValidator = require('express-validator');
var appInsights = require('applicationinsights');

var key = process.env.APPINSIGHTS_INSTRUMENTATIONKEY || '068a6990-4069-4371-a8e6-04616fedace4';

module.exports = () => {
    var app = express();

    app.use(expressValidator());
    app.use(logger('dev'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    appInsights.setup(key).start();
    
    consign( 
        {   cwd: 'app', 
            verbose: true,
            locale: 'pt-br',
            logger: console
         })
        .include('infra')
        .then('routes')
        .then('models')
        .then('controllers')
        .into(app);

    console.log('Modulo express carregado');

    return app;
}