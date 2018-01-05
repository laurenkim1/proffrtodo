// db.js

var mongoose = require('mongoose');
var options = {
	useMongoClient: true
};

var db = mongoose.connect('mongodb://laurenkim:jihye197@ds241677.mlab.com:41677/proffer', options);

module.exports = db;