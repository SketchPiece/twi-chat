var User = require('../models/user').User;

exports.get = function(req, res) {
    User.findById(req.session.user).exec((err, user) => {
        if (err) return reject(err);
        if (req.session.theme) {
            res.render('profile', { user: user, theme: req.session.theme });
        } else {
            res.render('profile', { user: user, theme: 'light' });
        }
    });
};

exports.light = function(req, res) {
    req.session.theme = 'light';
    res.redirect('/profile')
};

exports.dark = function(req, res) {
    req.session.theme = 'dark';
    res.redirect('/profile')
};