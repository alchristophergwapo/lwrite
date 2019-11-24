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
	
}, {
		collection: 'Posts'
	})
module.exports = mongoose.model('Posts', Posts);