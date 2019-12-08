const express = require('express'),
	multer = require('multer'),
	uuidv4 = require('uuid/v4');
const routeProfile = express.Router();
let Registration = require('./registrationSchema');
const bcrypt = require('bcryptjs');

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
	Registration.findOne({user_name : req.params._username})
		.then(user => {
			user.profile_image = url + req.file.filename;
			user.save()
				.then(() => res.send(user))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));

})

routeProfile.route('/updateAccount/:_id').post(function (req, res) {
	Registration.findByIdAndUpdate(req.params._id)
		.then(user => {
			const password = req.body.password;
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);

			user.first_name = req.body.first_name;
			user.last_name = req.body.last_name;
			user.user_name = req.body.user_name;
			user.password = hash;
			console.log(user)
			user.save()
				.then(() => res.send(user))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});


module.exports = routeProfile;