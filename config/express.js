var express = require('express'); 
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs  = require('express-handlebars');

module.exports = function() {

    var app = express(); 

    if (process.env.NODE_ENV === 'development') {

        app.use(morgan('dev'));

    } else if (process.env.NODE_ENV === 'production') {

        app.use(compress());

    }

    app.use(bodyParser.urlencoded({
        
        extended: true
    
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    exhbsConfig = {
        defaultView: './app/views/layouts/index',
        partialsDir: './app/views/partials',
        layoutsDir: './app/views/layouts'
    }

    app.set('views', './app/views/layouts');
    app.engine('handlebars', exphbs(exhbsConfig));

    app.set('view engine', 'handlebars');
    require('../app/routes/index.server.routes.js')(app);

    app.use(express.static('./'));

    return app;

};