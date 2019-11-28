const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Posts = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	body: {
		required: true,
		type: String
	},
	user: {
		type: String,
		required: true
	},
	background_image: {
	  data: Buffer, 
	  contentType: String 
	}
}, {
		collection: 'Posts'
	})
module.exports = mongoose.model('Posts', Posts);