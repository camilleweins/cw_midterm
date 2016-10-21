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

// router.get('./js', function(req, res) {
// 	res.render('kaleidoscope');
// });

// router.get('/kscope', function(req, res) {
// 	res.render('kscope');
// });

  // router.get('/', function(req, res) {
  // 	res.render();
  // });

router.get('/gallery', function(req, res) {
	//console.log(res.render(_id));
	var query = {}
	if (req.query.id) {
		query = {id: req.query.id};
	}
	K.find(query, function(err, data) {
		var pageData = {
			kscopes: data
		};
		res.render('image-gallery', pageData);
	});
	
});;

// router.get('/upload', function(req, res) {
// 	res.render('upload-pics');
// });


router.post('/add', upload.array('image', 3), function(req, res) {
	console.log(req.files);
	var fileNames = req.files.map(function(item) {
  	return item.filename;
});

	var kImage = new K({
		//amount: req.body.kImage,
		originalName: req.files.originalname,
		dateCreated: req.body.date,
		imageFileNames: fileNames

	});

// router.post('/add', upload.single('image'), function(req, res) {
// 	var kImage = new K({
// 		//amount: req.body.kImage,
// 		dateCreated: req.body.date,
// 		imageFileName: 'uploads/' + req.file.filename
// 	});

	kImage.save(function(err, data) {
		if (err) {
			//300 is to redirect
			//return res.sent('error!');
			return res.redirect(303, '/kscope');
		}
		res.redirect(200, '/gallery');
		//res.send('saved');
		//res.send('saved' + data.kImage);
	});
});

router.get('/:id', function(req, res) {
	console.log("hi");
	K.findOne({'_id': req.params.id}, function(err, data) {
		if (err) {
			console.log(err);
		}
		return res.render('kscope', data);
	});
});

module.exports = router;