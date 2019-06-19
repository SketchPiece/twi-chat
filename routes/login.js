var User = require('../models/user').User;
var asunc = require('async');
var HttpError = require('../error').HttpError;
exports.get = function (req, res) {
    res.render('login');
}

exports.post = function (req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    //console.log(username + " " + password);
    async.waterfall([
        function (callback) {
            User.findOne({ username: username }, callback)
        },
        function (user, callback) {
            if (user) {
                if (user.check.Password(password)) {
                    callback(null, user);
                } else {
                    next(new HttpError(403, "Пароль неверен"));
                }
            } else {
                var user = new User({ username: username, password: password });
                user.save(function (err) {
                    if (err) return next(404);
                    callback(null,user);
                });
            }
        }
    ], function (err) {
        if(err) return next(404);
        res.session.user = user._id;
        res.send({});
    });
}