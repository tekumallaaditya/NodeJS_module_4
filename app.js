var express = require('express');
var db=require('./models/db.js');
var bodyParser=require('body-parser');
var session=require('express-session');


var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//below are the links to the routes
var routes = require('./routes/route.js');
var user = require('./routes/user.js');
var story = require('./routes/story.js');

//below is the port
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/register', routes.register)
app.get('/logout', user.logout);
app.get('/new-story', routes.newstory);
app.get('/stories', story.stories);

app.post('/newUser', user.Ucreate );
app.post('/authenticate', user.login);
app.post('/add-story', story.addstory);

app.listen(port, function(){
    console.log('server up and running on port %s', port);
});

