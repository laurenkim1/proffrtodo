// app.js

var express = require('express');
var app = express();
var mongoose = require('mongoose');

var options = {
	useMongoClient: true
};

var db = mongoose.connect('mongodb://laurenkim:jihye197@ds241677.mlab.com:41677/proffr', options);

var RequestController = require('./RequestController');
app.use('/requests', RequestController);

var UserController = require('./UserController');
app.use('/users', UserController);

var NotificationController = require('./NotificationController');
app.use('/notifications', NotificationController);

module.exports = app;
