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
		type: String
	},
	background_image: {
	  type: String 
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