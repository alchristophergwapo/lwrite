const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Posts = new Schema({
	user:{
		type: Array
	},
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
	background_image: {
	  data: Buffer, 
	  contentType: String 
	},
	comments: {
		type: Array
	},
	user_name: {
		type: String
	}
}, {
		collection: 'Posts'
	})
module.exports = mongoose.model('Posts', Posts);