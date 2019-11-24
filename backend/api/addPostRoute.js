const express = require('express');
const routes = express.Router();
let Posts = require('./postSchema')

routes.route('/addPost').post(function (req, res) {
	let post = new Posts(req.body);

	post.save()
		.then(post => {
			res.sendStatus(200);
			console.log(post)
		})
		.catch(err => {
			res.status(400).send("Failed to add post");
		})
})

module.exports = routes;