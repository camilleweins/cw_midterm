var express = require('express');
var router = express.Router();

var Kscope = require('../models/schema'); 

//response json
router.get('/', function (req, res) {
	res.json({
		status: 'ok'
	});
});

router.post('/schema', function(req, res, next) {
	var kscope = new Kscope({
		date: req.body.date,
		//speed: req.body.speed

	});

	kscope.save(function(err, data) {
		if (err) {
			console.log(err);
			res.status(500);
			return res.json({
				status: 'error',
				message: 'could not create kscope',
				error: err
			});
		}

		return res.json({
			status: 'ok',
			message: 'created new kscope',
			kscope: data
		});
	});
});

router.get('/schema', function(req, res, next) {
	Kscope.find({}, function(err, data) {
		if (err) {
			res.status(500);
			return res.json({
				status: 'error',
				message: 'could not get images'
			});
		}
		return res.json(data);
	});
});

module.exports = router;