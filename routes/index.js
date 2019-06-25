var checkAuth = require('../middleware/checkAuth');
var User = require('../models/user').User;
var async = require('async');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var upload = require('../libs/gridfs').Upload;
// var gfs = require('../libs/gridfs').GFS;
const config = require('../config/config.json');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const connect = mongoose.createConnection(config.mongoose.uri);
const jimp = require('jimp');

let gfs;

connect.once('open', () => {
    // Init stream
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection('uploads');
});

function defaultImg(res){
    jimp.read('default.png').then(image => {
        try{
            image.getBuffer(jimp.AUTO, (error, buffer) => {
                res.header('Content-Type', 'image/png');
                return res.status(200).send(new Buffer(buffer, 'base64'));
            });
            }
        catch(err){
            res.send('Произошла какая то ошибочка');
            console.log(err);
        }
    })
}

function checkAuthLog(req, res, next) {
    if (req.session.user) {
        res.redirect('/chat');
    } else {
        next();
    }
}

module.exports = function (app) {

    app.get('/', require('./frontpage').get);

    app.get('/login', checkAuthLog, function (req, res, next) {
        if (req.query && req.query.username && req.query.password) {
            var username = req.query.username;
            var password = req.query.password;

            // console.log(username + " " + password);

            User.authorize(username, password, function (err, user) {
                if (err) {
                    if (err instanceof AuthError) {
                        return next(new HttpError(403, err.message));
                    } else {
                        return next(404);
                    }
                }

                req.session.user = user._id;
                res.redirect('/chat');
            })
        } else {
            res.render('login');
        }
    });



    app.get('/logout', require('./logout').get);

    app.get('/chat', checkAuth, require('./chat').get);

    app.get('/profile', checkAuth, require('./profile').get);

    app.post('/light', checkAuth, require('./profile').light);
    app.post('/dark', checkAuth, require('./profile').dark);

    app.get('/files', (req, res) => {
        gfs.files.find().toArray((err, files) => {
            // Check if files
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: 'No files exist'
                });
            }

            // Files exist
            return res.json(files);
        });
    });


    app.post('/upload', upload.single('file'), (req, res) => {
        // console.log('================================================');
        // console.log(req.file);
        User.findById(req.session.user, function (err, user) {
            if (err) return next(err);

            if (user.avaurl != 'default.png') {
                gfs.remove({ filename: user.avaurl, root: 'uploads' }, (err, gridStore) => {
                    if (err) {
                        return res.status(404).json({ err: err });
                    }

                    // res.redirect('/');
                });

            }

            user.avaurl = req.file.filename;
            user.save();
            // console.log('123=======================================');
        });
        res.redirect('/profile');
        // res.redirect('/');
    });

    // app.get('/image/:filename', (req, res) => {
    //     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //         // Check if file
    //         if (!file || file.length === 0) {
    //             return res.status(404).json({
    //                 err: 'No file exists'
    //             });
    //         }

    //         // Check if image
    //         if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/gif') {
    //             // Read output to browser
    //             const readstream = gfs.createReadStream(file.filename);
    //             readstream.pipe(res);
    //         } else {
    //             res.status(404).json({
    //                 err: 'Not an image'
    //             });
    //         }
    //     });
    // });

    app.get('/image/:id', (req, res) => {

        User.findById(req.params.id, function (err, user) {
            if (err) return next(err);

            gfs.files.findOne({ filename: user.avaurl }, (err, file) => {
                // Check if file
                if (!file || file.length === 0) {
                    return defaultImg(res);
                }
    
                // Check if image
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    // Read output to browser
                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image'
                    });
                }
            });
        });
        // res.json({ file: req.file });
        // res.redirect('/');
        
    });



    // app.post('/upload', upload.single('file'), (req, res) => {
    //     res.json({ file: req.file });
    //     // res.redirect('/');
    // });

    // app.use(function(req,res){
    //     res.type('text/plain');
    //     res.status(404);
    //     res.send('../template/derror.html');
    // })
};