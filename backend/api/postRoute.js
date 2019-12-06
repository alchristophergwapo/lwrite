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

router.post('/addPost', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/", (req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
});