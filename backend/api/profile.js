const express = require('express'),
	multer = require('multer'),
	uuidv4 = require('uuid/v4');
const routeProfile = express.Router();
let Registration = require('./registrationSchema');

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

routeProfile.post('/updateProfileImage/:_username', upload.single('profile_image'), (req, res, next) => {
	const url = 'http://localhost:4000/public/images/'
	Registration.findOneAndUpdate(req.params._username)
	.then(user => {
		user.profile_image = url + req.file.filename;
		user.save()
			.then(() => res.send(user))
			.catch(err => res.status(400).json('Error: ' + err));
	})
	.catch(err => res.status(400).json('Error: ' + err));
	
})

routeProfile.route('/updateProfle/:_id').post(function (req, res) {
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


module.exports = routeProfile;