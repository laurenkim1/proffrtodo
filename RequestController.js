// RequestController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
var Request = require('./Request');
var db = require('./db');

// CREATES A NEW REQUEST
router.post('/', function (req, res) {
    Request.create({
            createdAt: new Date(),
            userID: req.body.userID,
            userName: req.body.userName,
            requestTitle: req.body.requestTitle,
            requestPrice: req.body.requestPrice,
            fulfilled: req.body.fulfilled,
            fulfillerID: req.body.fulfillerID,
            requestTags: req.body.requestTags,
            pickUp: req.body.pickUp,
            distance: req.body.distance,
            location: req.body.location,
            photoUrl: req.body.photoUrl,
            rent: req.body.rent
        },
        function (err, request) {
            console.log(err)
            if (err) return res.status(500).send("There was a problem adding the information to the request database.");
            res.status(200).send(request);
        });
});
// RETURNS ALL THE REQUESTS IN THE DATABASE
router.get('/', function (req, res) {
    Request.find({ 
  createdAt : { 
    $lt: new Date(), 
    $gte: new Date(new Date().setDate(new Date().getDate()-1))
  }}, function (err, requests) {
        if (err) return res.status(500).send("There was a problem finding the requests.");
        res.status(200).send(requests);
    });
});

// GETS A SINGLE REQUEST FROM THE DATABASE

router.get('/search/:id', function (req, res) {
    Request.findById(req.params.id, function (err, request) {
        if (err) return res.status(500).send("There was a problem finding the request.");
        if (!request) return res.status(404).send("No request found.");
        res.status(200).send(request);
    });
});

// GETS A USER REQUESTS FROM THE DATABASE

router.get('/myRequests', function (req, res) {
    Request.find({ userID: req.query.id }).sort({createdAt:-1}).limit(20).exec(function (err, request) {
        console.log(err);
        if (err) return res.status(500).send("There was a problem finding the requests.");
        res.status(200).send(request);
    });
});

// GETS REQUESTS WITHIN RADIUS OF LOCATION FROM THE DATABASE
router.get('/:radius', function (req, res) {
    var lat = parseFloat(req.query.lat);
    var lon = parseFloat(req.query.lon);
    var rad = parseFloat(req.params.radius) / 3963.2;
    var geoloc = [ lon, lat ];
    console.log(rad);
    console.log(lon);
    console.log(lat);
    var start = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    Request.find({ location: { $geoWithin: { $centerSphere: [ geoloc, rad ] } }, createdAt: { $gte: start }, fulfilled: false }).sort({createdAt:-1}).exec(function (err, request) {
        console.log(err);
        if (err) return res.status(500).send("There was a problem finding the requests.");
        res.status(200).send(request);
    });
});

// DELETES A REQUEST FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Request.findByIdAndRemove(req.params.id, function (err, request) {
        if (err) return res.status(500).send("There was a problem deleting the request.");
        res.status(200).send("Request "+ request.requestTitle +" was deleted.");
    });
});

// UPDATES A SINGLE REQUEST IN THE DATABASE
router.put('/:id', function (req, res) {

    Request.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, request) {
        if (err) return res.status(500).send("There was a problem updating the request.");
        res.status(200).send(request);
    });
});

module.exports = router;
