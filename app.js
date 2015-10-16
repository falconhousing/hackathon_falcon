var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(app.router);

app.get('/', routes.index);

var server = app.listen(process.env.PORT || 3000, function(){
    console.log("App Started at port "+(process.env.PORT || 3000));
})

module.exports = app;