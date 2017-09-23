// db.js

var mongoose = require('mongoose');
var options = {
	useMongoClient: true
};

var db = mongoose.connect('mongodb://laurenkim:jihye197@ds119064.mlab.com:19064/proffr', options);

module.exports = db;