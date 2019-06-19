var checkAuth = require('../middleware/checkAuth');
var User = require('../models/user').User;
var async = require('async');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

function checkAuthLog(req, res, next) {
    if (req.session.user) {
        res.redirect('/chat');
    } else {
        next();
    }
}

module.exports = function(app) {

    app.get('/', require('./frontpage').get);

    app.get('/login', checkAuthLog, function(req, res, next) {
        if (req.query && req.query.username && req.query.password) {
            var username = req.query.username;
            var password = req.query.password;

            console.log(username + " " + password);

            User.authorize(username, password, function(err, user) {
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

    // app.use(function(req,res){
    //     res.type('text/plain');
    //     res.status(404);
    //     res.send('../template/derror.html');
    // })
};