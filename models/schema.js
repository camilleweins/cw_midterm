var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kSchema = new Schema({
	imageFileNames: [String],
	dateCreated: {type: Date, default: Date.now},
});

var Kaleidoscope = mongoose.model('Kaleidoscope', kSchema);

module.exports = Kaleidoscope;