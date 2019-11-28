express = require('express')
    , router = express.Router()
    , MongoClient = require('mongodb').MongoClient
    , ObjectId = require('mongodb').ObjectId
    , fs = require('fs-extra')
    // Your mongodb or mLabs connection string
    , url = 'mongodb://username:password@yourinstanced.mlab.com:29459/yourdb'
    , multer = require('multer')
    , util = require('util')
    , upload = multer({ limits: { fileSize: 2000000 }, dest: '/uploads/' })
// Default route http://localhost:3000/
router.get('/', function (req, res) { res.render('index'); });
// Form POST action handler
router.post('/uploadpicture', upload.single('picture'), function (req, res) {
    if (req.file == null) {
        // If Submit was accidentally clicked with no file selected...
        res.render('index', {
            title: 'Please select a picture file to submit!'
        });
    } else {
        MongoClient.connect(url, function (err, db) {
            // read the img file from tmp in-memory location
            var newImg = fs.readFileSync(req.file.path);
            // encode the file as a base64 string.
            var encImg = newImg.toString('base64');
            // define your new document
            var newItem = {
                description: req.body.description,
                contentType: req.file.mimetype,
                size: req.file.size,
                img: Buffer(encImg, 'base64')
            };
            db.collection('yourcollectionname')
                .insert(newItem, function (err, result) {
                    if (err) { console.log(err); };
                    var newoid = new ObjectId(result.ops[0]._id);
                    fs.remove(req.file.path, function (err) {
                        if (err) { console.log(err) };
                        res.render('index', { title: 'Thanks for the Picture!' });
                    });
                });
        });
    };
});

router.get('/picture/:picture', function (req, res) {
    // assign the URL parameter to a variable
    var filename = req.params.picture;
    // open the mongodb connection with the connection
    // string stored in the variable called url.
    MongoClient.connect(url, function (err, db) {
        db.collection('yourcollectionname')
            // perform a mongodb search and return only one result.
            // convert the variabvle called filename into a valid
            // objectId.
            .findOne({ '_id': ObjectId(filename) }, function (err, results) {
                // set the http response header so the browser knows this
                // is an 'image/jpeg' or 'image/png'
                res.setHeader('content-type', results.contentType);
                // send only the base64 string stored in the img object
                // buffer element
                res.send(results.img.buffer);
            });
    });
});