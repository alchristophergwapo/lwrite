const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Posts = new Schema({
	post: {
		type: Array
	}
},{
	collection: 'Posts'
})
module.exports = mongoose.model('Posts',Posts);