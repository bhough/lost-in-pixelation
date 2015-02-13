module.exports = function( app) { 
    var index = require('../controllers/index.server.controller'); 
    app.get('/', index.render); 
    app.get('/long-road-home', index.render);
};