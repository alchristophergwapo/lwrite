const express = require('express'),
	multer = require('multer'),
	uuidv4 = require('uuid/v4');
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
	Registration.findOne({ user_name: req.params.user_name })
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

routes.route('/updatePost/:_id').post(function (req, res) {
	Posts.findById(req.params._id)
		.then(post => {
			post.title = req.body.title;
			post.description = req.body.description;
			post.body = req.body.body;

			post.save()
				.then(() => res.json('Post updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
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

const DIR = '../../frontend/src/component/dashboard/images';
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, uuidv4() + '-' + fileName)
	}
});

var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
		}
	}
});


routes.route('/updateProfile/:_id', upload.single('profileImg')).post(function (req, res, next) {
	Registration.findById(req.params._id)
		.then(user => {
			const url = req.protocol + '://' + req.get('host')

			user.first_name = req.body.first_name;
			user.last_name = req.body.last_name;
			user.user_name = req.body.user_name;
			user.password = req.body.password;
			profile_image = url + '../../frontend/src/component/dashboard/images' + req.body.profile_image

			user.save().then(result => {
				res.status(201).json({
					message: "User profile updated successfully!",
					userUpdated: {
						result: result
					}
				})
			}).catch(err => {
				console.log(err),
					res.status(500).json({
						error: err
					});
			})
		})
		.catch(err => res.status(400).json('Error: ' + err));


})

module.exports = routes;