const express                = require('express');
const path                   = require('path');
const template             = require('consolidate');
const bodyParser          = require('body-parser');
const passport             = require('passport');
const flash                  = require('connect-flash');
const cookieParser        = require('cookie-parser');
const cookieSession       = require('cookie-session');


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.engine('pug', template.pug);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(flash());

app.use(cookieParser()); // read cookies (needed for auth)
 // get information from html forms

app.use(cookieSession({
    name: 'session',
    keys: ['secret'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.static(__dirname + '/public'));
//app.use('/profile', express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport);
require('./routes/index')(app, passport);

app.listen(3000);
console.log('server start at 3000');