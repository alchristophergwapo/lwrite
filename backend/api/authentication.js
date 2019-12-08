const express = require('express')
const routes = express.Router();
const bcrypt = require('bcryptjs');
let Registration = require('./registrationSchema');


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
routes.route('/allUsers').get(function (req, res) {
	Registration.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
});



module.exports = routes;