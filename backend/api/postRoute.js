const express = require('express'),
	multer = require('multer'),
	uuidv4 = require('uuid/v4');
const routePost = express.Router();
let Posts = require('./postSchema');

const DIR = './public/images/';

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


// routePost.route('/uploadPostImage', upload.single('background_image')).post(function (req, res, next) {
// 	const url = req.protocol + '://' + req.get('host')
// 	const user = new Posts({
// 		title: req.body.title,
// 		body: req.body.body,
// 		background_image: url + '/images/' + req.file.filename
// 	});
// 	user.save().then(result => {
// 		res.status(201).json({
// 			message: "Post added successfully!",
// 			userCreated: {
// 				user: user
// 			}
// 		})
// 	}).catch(err => {
// 		console.log(err),
// 			res.status(500).json({
// 				error: err
// 			});
// 	})
// })

routePost.post('/uploadPostImage', upload.single('background_image'), (req, res, next) => {
	const url = 'http://localhost:4000/public/images/'
	const user = [{
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		profile_image: req.body.profile_image
	}]
	console.log("first name : ",req.body.first_name)
	console.log("last name : ",req.body.first_name)
	const post = new Posts({
		user_name: req.body.user_name,
        user: user,
		title: req.body.title,
		description: req.body.description,
		body: req.body.body,
		background_image: url + req.file.filename
	});
	console.log("post : ",post);
	post.save().then(result => {
		console.log("reslut : ", result)
		res.status(201).json({
			message: "Post added successfully!",
			userCreated: {
				post: post
			}
		})
	}).catch(err => {
		console.log(err),
			res.status(500).json({
				error: err
			});
	})
})

routePost.route('/addPost').post(function (req, res) {
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
routePost.route('/getPosts').get(function (req, res) {
	Posts.find()
		.then(posts => res.send(posts))
		.catch(err => res.status(400).json('Error: ' + err));
});

routePost.route('/deletePost/:id').delete(function (req, res) {
	console.log(req.params.id)
	Posts.findByIdAndDelete(req.params.id)
		.then(() => res.json('Exercise deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
})

routePost.route('/updatePost/:_id').post(function (req, res) {
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

routePost.route('/addComment/:_id').put(function (req, res) {
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

module.exports = routePost;