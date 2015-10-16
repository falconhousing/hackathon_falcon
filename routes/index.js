var Promise = require("bluebird");
var http 	= require("http");
/* GET home page. */
exports.index = function(req, res){
	res.render('index', { title: 'Company Title'});
};

exports.main = function(req, res){
	res.render('main', { title: 'Company Title'});
};