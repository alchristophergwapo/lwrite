const express = require('express'),
	multer = require('multer'),
	uuidv4 = require('uuid/v4');
const routeUpdateProfile = express.Router();
let Registration = require('./postSchema');

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

routeUpdateProfile.post('/uploadProfileImage', upload.single('profile_image'), (req, res, next) => {
	const url = 'http://localhost:4000/public/'
	const post = new Registration({
		profile_image: url + req.file.filename
	});
	console.log("post : ",post);
	post.save().then(result => {
		console.log("result : ", result)
		res.status(201).json({
			message: "Profile picture added successfully!",
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

module.exports = routeUpdateProfile;