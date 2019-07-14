var checkAuth = require('../middleware/checkAuth');
var User = require('../models/user').User;
var FriendRequest = require('../models/friendReq').FriendRequest;
var async = require('async');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

var upload = require('../libs/gridfs').Upload;

// var gfs = require('../libs/gridfs').GFS;

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
                        throw err;
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

    app.post('/upload', checkAuth, require('./upload').get);

    app.get('/image/:id', require('./image').get);

    app.get('/direct', checkAuth, require('./direct').get);

    app.post('/addfriend', checkAuth, require('./addfriend').post);

    app.post('/acceptfreandship', checkAuth, require('./acceptfreandship').post);

    app.post('/refusefreandship', checkAuth, async (req, res, next) => {
        console.log(req.query.id);

        res.redirect('/profile');
    });  
    // EDIT!!!

    app.post('/delfriend', checkAuth,async (req, res, next) => {
        User.findById(req.session.user, function (err, user) {
            user.friends.splice(user.friends.indexOf(req.query.id), 1);
            user.save();
        });
        User.findById(req.query.id, function (err, user) {
            user.friends.splice(user.friends.indexOf(req.query.id), 1);
            user.save();
        });
        backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    });
};