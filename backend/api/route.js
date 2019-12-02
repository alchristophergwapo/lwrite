const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');
let Registration = require('./registrationSchema');
let Posts = require('./postSchema');


// Registration route
routes.route('/register').post(function (req, res) {
	let register = new Registration(req.body);
	register.save()
		.then(register => {
			res.sendStatus(200);
			console.log(register);
		})
		.catch(err => {
			console.log(err);
			res.status(400).send("Failed to store to database");
		});
});

// Login Router
routes.route('/login').post(function (req, res) {
	Registration.findOne({ user_name: req.body.user_name })
		.then(user => {
			console.log("User from login", user)
			// res.send(user)
			if (!user) res.sendStatus(204);
			else {
				bcrypt.compare(req.body.password, user.password)
					.then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
			}
		})
});

// Username validation Router
routes.route('/validateUsername').post(function (req, res) {
	Registration.findOne({ user_name: req.body.user_name })
		.then(user => user ? res.sendStatus(204) : res.sendStatus(200))
});

// 
routes.route('/getUser/:user_name').get(function (req, res) {
	Registration.findOne({user_name: req.params.user_name })
		.then(user => {
			res.send(user)
		})
		.catch(error => {
			res.send(error)
		})
});

// Get allData
routes.route('/allData').get(function (req, res) {
	Registration.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
});

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

// 
routes.route('/getPosts').get(function (req, res) {
	Posts.find()
		.then(posts => res.send(posts))
		.catch(err => res.status(400).json('Error: ' + err));
});

routes.route('/deletePost/:id').delete(function (req, res) {
	console.log(req.params.id)
	Posts.findByIdAndDelete(req.params.id)
		.then(() => res.json('Exercise deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
})

routes.route('/updatePost/:_id')
.post(function(req, res) {
 console.log(req.body);
  Posts.update({_id: req.body._id}, req.body, function(err, post) {
      if (err)
        res.send(err);
      res.send('Post successfully updated!'+ post);
  });
});

routes.route('/addComment/:_id').put(function (req, res) {
	Posts.findByIdAndUpdate(req.params._id,
		{ $push: { comments: req.body } },
		{ safe: true, upsert: true },
		// console.log(req.body.comment),
		function (err, comments) {
			if (err) {
				console.log(err);
			} else {
				res.send(comments)
				console.log(req.body)
			}
		})
})

module.exports = routes;