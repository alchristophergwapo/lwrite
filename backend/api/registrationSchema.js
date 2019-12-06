const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// collection and schema for Registration
let Registration = new Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	user_name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	profile_image: {
		type: String
	}
},{
		collection: 'Registration'
});

module.exports = mongoose.model('Registration', Registration);
