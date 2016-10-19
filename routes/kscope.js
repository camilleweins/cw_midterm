//kscope routes
var express = require('express');
var router = express.Router();

var path = require('path');

var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({dest: uploadPath});

var K = require('../models/schema'); //use the schema

router.get('/add', function(req, res) {
	res.render('upload-pics');
});

router.post('/add', upload.single('image'), function(req, res) {
	var kImage = new KImage({
		amount: req.body.kImage,
		imageFileName: 'uploads/' + req.file.filename
	});

	kImage.save(function(err, data) {
		if (err) {
			//300 is to redirect
			//return res.sent('error!');
			return res.redirect(303, '/image');
		}
		res.send('saved' + data.kImage);
	});
});

//DO QUERY BUILDER FOR A GALLERY???
router.get('/', function(req, res) {
	Pet.find({}, function(err, data) {
		var pageData = { //render pets view with page data
			pets: data
		};
		res.render('pets', pets); //render an array of pets

	}); //tell pet model to find pets that fit a criteria
});

module.exports = router;