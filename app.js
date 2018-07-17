var express = require('express');


var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//below are the links to the routes
var routes = require('./routes/route.js')

//below is the port
var port = process.env.PORT || 3000;

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/register', routes.register)

app.listen(port, function(){
    console.log('server up and running on port %s', port);
});

