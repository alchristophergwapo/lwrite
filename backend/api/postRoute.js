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
	const post = new Posts({
		user_name: req.body.user_name,
        user: req.body.user[0],
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

// routePost.get("/", (req, res, next) => {
// 	User.find().then(data => {
// 		res.status(200).json({
// 			message: "User list retrieved successfully!",
// 			users: data
// 		});
// 	});
// });

module.exports = routePost;