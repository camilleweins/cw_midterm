var express = require('express');
var router = express.Router();

var Kscope = require('../models/schema'); 

//response json
router.get('/', function (req, res) {
	res.json({
		status: 'ok'
	});
});

router.post('/kscope', function(req, res, next) {
	var kscope = new Kscope({
		date: req.body.date,
		speed: req.body.speed

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

module.exports = router;