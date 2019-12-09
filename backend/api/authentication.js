const express = require('express')
const routes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
				var passwordValid = bcrypt.compare(req.body.password, user.password)
				if(!passwordValid){
					return res.status(401).json({auth : false, token : null, message : "Not Authorised User"});
				}else{
					let payload = {
						user_id : user._id,
						username : user.username
					}
					console.log(config.secrets.session);
					let token = jwt.sign(payload, config.secrets.session,{
						expiresIn : 1000
					});
					
					res.sendStatus(200).json({auth : true, token : token, message : "User Logged In Successfully"});
				}
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