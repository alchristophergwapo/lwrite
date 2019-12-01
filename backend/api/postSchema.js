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
	background_image: {
	  data: Buffer, 
	  contentType: String 
	},
	likes: {
		type: Number
	},
	comments: {
		type: Array
	},
	user_name: {
		type: String
	},
	user:{
		type: Array
	},
}, {
		collection: 'Posts'
	})
module.exports = mongoose.model('Posts', Posts);